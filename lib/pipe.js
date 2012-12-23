var superagent = require('superagent');
var parser = require('./parser');

var userAgent = 'liftie/1.0.0 (http://liftie.info)';

module.exports = function (url, parse, fn) {
  var from = superagent
    .get(url.host + url.pathname)
    .query(url.query)
    .set('User-Agent', userAgent);

  from.on('error', fn);

  console.log('Request: ', url);
  from.pipe(parser(parse, fn));
};
