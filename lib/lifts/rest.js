var superagent = require('superagent');
var userAgent = 'liftie/1.0.0 (http://liftie.info)';
var parseHtml = require('./parser').html;

module.exports = rest;

function rest(url, parse, fn) {
  var fullUrl = url.host + url.pathname;
  var request = url.body
    ? superagent.post(fullUrl).send(url.body)
    : superagent.get(fullUrl);

  if (url.query) {
    request.query(url.query);
  }

  request
    .set('User-Agent', userAgent)
    .set('Accept', 'application/json')
    .on('error', fn);
  request
    .end(function(err, res) {
    if (err) {
      return fn(err.status);
    }
    if (url.html) {
      parseHtml(res.body, parse, fn);
    } else {
      fn(null, parse(res.body));
    }
  });
}
