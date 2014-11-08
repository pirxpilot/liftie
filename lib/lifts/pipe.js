var superagent = require('superagent');
var parser = require('./parser');

var userAgent = 'liftie/1.0.0 (http://liftie.info)';

// HACK: stop checking certs
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

module.exports = function (url, parse, fn) {
  function pipe(response) {
    var stream = parser(parse, fn);
    stream.write(response);
    stream.end();
  }

  superagent
    .get(url.host + url.pathname)
    .redirects(4)
    .query(url.query || '')
    .set('User-Agent', userAgent)
    .set('Accept', '*/*')
    .buffer(true)
    .on('error', fn)
    .end(function(res) {
      if (res.error) {
        console.error('Error', url, res.error);
        return fn(res.status);
      }
      if (!res.text) {
        console.error('Empty response', url);
        return fn('empty response');
      }
      pipe(res.text);
    });
};
