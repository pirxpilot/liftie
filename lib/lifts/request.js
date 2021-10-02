var superagent = require('superagent');

var userAgent = 'Mozilla/5.0 (compatible; Liftie/1.0; +https://liftie.info)';

module.exports = function (url) {

  return superagent
    .agent()
    .get(url.host + url.pathname)
    .redirects(4)
    .query(url.query || '')
    .set('User-Agent', userAgent)
    .set('Accept', '*/*');
};
