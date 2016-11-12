var superagent = require('superagent');

var userAgent = 'Mozilla/5.0 (compatible; Liftie/1.0; +https://liftie.info)';

// HACK: stop checking certs
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

module.exports = function (url) {

  return superagent
    .get(url.host + url.pathname)
    .redirects(4)
    .query(url.query || '')
    .set('User-Agent', userAgent)
    .set('Accept', '*/*');
};
