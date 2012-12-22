var htmlparser = require('htmlparser2');
var soupselect = require('cheerio-soupselect');

/**
 * Creates a writeable stream (you can pipe data from request or file stream to it),
 * that will use 'parse' function and 'fn' callback to retrieve info from HTML
 * @param parse($, fn) - receives 'select' method and fn callback, callback should be called,
 *		for each data item that is found
 * @param fn(err, data) - callback that receives identified data pieces (or error),
 *		first error should stop parsing
 */
function createParserStream(ctx, parse, fn) {
  var handler = new htmlparser.DomHandler(function (err, dom) {
    if (err) {
      return fn(err);
    }
    parse(ctx, dom, function (selector) {
      return soupselect.select(dom, selector);
    }, fn);
  }, {
    ignoreWhitespace: true
  }),
  parser = new htmlparser.WritableStream(handler, {
    lowerCaseTags: true
  });
  parser.on('error', function(err) {
    fn(err);
  });
  return parser;
}

module.exports = createParserStream;