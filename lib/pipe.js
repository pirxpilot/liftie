var superagent = require('superagent');
var parser = require('./parser');

var userAgent = 'liftie/1.0.0 (http://liftie.info)';


module.exports = function (url, parse, fn) {
  var from;

  // similar to superagent pipe, but does not proceed if response had errors
  function pipe(stream) {
    var error;

    from.buffer(false);
    from.end(function(res) {
      if (!error && res.error) {
        error = res.error;
        console.log('Error', url, res.error);
        fn(res.status);
      }
    }).req.on('response', function(res) {
      if (!error) {
        res.pipe(stream);
      }
    });
  }

  from = superagent
    .get(url.host + url.pathname)
    .set('User-Agent', userAgent)
    .on('error', fn);

  if (url.query) {
    from.query(url.query);
  }

  pipe(parser(parse, fn));
};
