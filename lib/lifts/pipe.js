const request = require('./request');
const parseHtml = require('./parser').html;

module.exports = (url, parse, fn) => {
  request(url)
    .buffer(true)
    .on('error', fn)
    .end((err, res) => {
      if (err && !url.ignoreErrors) {
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
