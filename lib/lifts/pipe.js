var request = require('./request');
var parser = require('./parser');

module.exports = function (url, parse, fn) {
  function pipe(response) {
    var stream = parser(parse, fn);
    stream.write(response);
    stream.end();
  }

  request(url)
    .buffer(true)
    .on('error', fn)
    .end(function(err, res) {
      if (err) {
        console.error('Error', url, err.status);
        return fn(err.status);
      }
      if (!res.text) {
        console.error('Empty response', url);
        return fn('empty response');
      }
      pipe(res.text);
    });
};
