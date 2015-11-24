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
  request.end(function(err, res) {
    if (err) {
      console.log('Error', url, err.status);
      fn(err.status);
    } else {
      fn(null, parse(res.body));
    }
  });
}