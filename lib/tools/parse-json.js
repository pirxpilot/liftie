const { Transform } = require('stream');
const debug = require('debug')('liftie:tools');

module.exports = parse;

function parse() {
  const chunks = [];

  function transform(chunk, encoding, next) {
    chunks.push(chunk);
    next();
  }

  function safeParse(json) {
    if (!json) {
      return;
    }
    try {
      return JSON.parse(json);
    } catch(e) {
      debug('Error parsing JSON', e);
    }
  }

  function final(next) {  // jshint ignore:line
    const o = safeParse(chunks.join(''));
    if (o) {
      this.push(o);
    }
    next();
  }

  return new Transform({
    objectMode: true,
    transform,
    final
  });
}
