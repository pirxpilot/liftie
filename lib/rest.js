var superagent = require('superagent');
var userAgent = 'liftie/1.0.0 (http://liftie.info)';

module.exports = rest;

function rest(url, parse, fn) {
  var request = superagent
    .get(url.host + url.pathname)
    .set('User-Agent', userAgent)
    .set('Accept', 'application/json')
    .on('error', fn);
  if (url.query) {
    request.query(url.query);
  }
  request.end(function(res) {
    if (res.error) {
      console.log('Error', url, res.error);
      fn(res.status);
    } else {
      fn(null, parse(res.body));
    }
  });
}