var request = require('./request');
var parseHtml = require('./parser').html;

module.exports = function (url, parse, fn) {
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
      parseHtml(res.text, parse, fn);
    });
};
