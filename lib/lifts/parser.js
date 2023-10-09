const { nextTick } = require('node:process');
const { DomHandler, Text } = require('domhandler');
const { ElementType } = require('domelementtype');
const { WritableStream } = require("htmlparser2/lib/WritableStream");

module.exports = parserStream;

parserStream.html = parseHtml;


function parseHtml(html, parse, fn) {
  const stream = parserStream(parse, fn);
  stream.write(html);
  stream.end();
}

function normalize(str) {
  return str.replace(/\s+/g, ' ');
}

// special version of DomHandler that ignores empty text nodes
// for compatibility with old `ignoreWhitespace` option that is not longer supported
class IgnoreEmptiesDomHandler extends DomHandler {
  ontext(data) {
    const { lastNode } = this;
    if (lastNode && lastNode.type === ElementType.Text) {
      lastNode.data = normalize(lastNode.data + data);
    } else {
      data = normalize(data);
      if (data !== ' ') {
        const node = new Text(data);
        this.addNode(node);
        this.lastNode = node;
      }
    }
  }
}

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
    return err ? fn(err) : nextTick(fn, null, parse(dom));
  }

  const parser = new WritableStream(new IgnoreEmptiesDomHandler(handle), {
    decodeEntities: true,
    lowerCaseTags: true,
    lowerCaseAttributeNames: false
  });
  parser.on('error', fn);
  return parser;
}
