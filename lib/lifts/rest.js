const superagent = require('superagent');
const userAgent = 'liftie/1.0.0 (https://liftie.info)';
const parseHtml = require('./parser').html;

module.exports = rest;

function rest(url, parse, fn) {
  const fullUrl = url.host + url.pathname;

  const request = url.body ?
    superagent.post(fullUrl).send(url.body) :
    superagent.get(fullUrl);

  if (url.query) {
    request.query(url.query);
  }
  if (url.http2) {
    request.http2(true);
  }

  request
    .set('User-Agent', userAgent)
    .set('Accept', 'application/json')
    .on('error', fn);

  request.then(
    (res) => {
      let { body, text } = res;
      if (url.html) {
        return parseHtml(body, parse, fn);
      }
      if (url.json) {
        // used when client does not send proper Content-Type
        try {
          body = JSON.parse(text);
        } catch {
          console.error('cannot parse', url);
          body = {};
        }
      }
      if (parse.isAsync) {
        parse(body, fn);
      } else {
        fn(null, parse(body));
      }
    },
    ({ status }) => {
      fn(status);
    }
  );
}
