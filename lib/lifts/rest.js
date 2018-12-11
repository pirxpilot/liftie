const superagent = require('superagent');
const userAgent = 'liftie/1.0.0 (https://liftie.info)';
const parseHtml = require('./parser').html;

module.exports = rest;

function rest(url, parse, fn) {
  const fullUrl = url.host + url.pathname;

  const request = url.body
    ? superagent.post(fullUrl).send(url.body)
    : superagent.get(fullUrl);

  if (url.query) {
    request.query(url.query);
  }

  request
    .set('User-Agent', userAgent)
    .set('Accept', 'application/json')
    .on('error', fn);

  request.then(
    function({ body }) {
      if (url.html) {
        return parseHtml(body, parse, fn);
      }
      if (parse.isAsync) {
        parse(body, fn);
      } else {
        fn(null, parse(body));
      }
    },
    function({ status }) {
      fn(status);
    }
  );
}
