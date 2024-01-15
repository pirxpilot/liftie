const superagent = require('superagent');

const userAgent = 'Mozilla/5.0 (compatible; Liftie/1.0; +https://liftie.info)';

module.exports = ({ host, pathname, query, http2 }) => {

  const req = superagent
    .agent()
    .get(host + pathname)
    .redirects(4)
    .set('User-Agent', userAgent)
    .set('Accept', '*/*');
  if (query) {
    req.query(query);
  }
  if (http2) {
    req.http2(true);
  }
  return req;
};
