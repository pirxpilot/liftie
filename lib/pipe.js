var superagent = require('superagent');
var parser = require('./parser');

var userAgent = 'liftie/1.0.0 '
    + '(http://liftie.info)';

module.exports = function (hostUrl, url, query, parse, fn) {
  console.log('Piping: ', url, query);
  var from, to;

  function full(url) {
    return hostUrl + url;
  }

  function request() {
    return superagent
      .get(full(url))
      .set('User-Agent', userAgent);
  }

  from = request();
  if (query) {
    from.query(query);
  }
  from.on('error', fn);
  to = parser({ url: url }, parse, fn);
  from.pipe(to);
};
