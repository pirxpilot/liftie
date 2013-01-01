var htmlparser = require('htmlparser2');

module.exports = parserStream;

/**
 * Creates a writeable stream (you can pipe data from request or file stream to it),
 * that will use 'parse' function and 'fn' callback to retrieve info from HTML
 *
 * @param parse(dom, fn) - receives dom tree method and fn callback
 * @param fn(err, data) - callback that receives identified data pieces (or error),
 *    first error should stop parsing
 */
function parserStream(parse, fn) {
  function handle(err, dom) {
    if (err) {
      return fn(err);
    }
    fn(null, parse(dom));
  }

  var parser = new htmlparser.WritableStream(new htmlparser.DomHandler(handle , {
    ignoreWhitespace: true
  }), {
    lowerCaseTags: true
  });
  parser.on('error', fn);
  return parser;
}
