const assert = require('assert');
const { createReadStream } = require('fs');

const parser = require('../../lib/lifts/parser');
const makeParse = require('../../lib/lifts/parse');

module.exports = testResort;

function testResort(name, ext, expected, only = false) {

  const filename = `${__dirname}/../resorts/example/${name}.${ext}`;
  const parse = makeParse(name);

  function testHTML() {
    it('should return lift status', function(done) {
      const stream = createReadStream(filename);

      stream.on('error', done);
      stream.pipe(parser(parse, function(err, status) {
        assert.deepEqual(status, expected);
        done(err);
      }));

    });
  }

  function testJSON() {
    const asyncParse = parse.isAsync ?
      parse :
      (data, fn) => process.nextTick(fn, null, parse(data));

    it('should return lift status', function(done) {
      const data = require(filename);

      asyncParse(data, function(err, status) {
        assert.deepEqual(status, expected);
        done(err);
      });
    });

  }

  const tested = ext === 'json' ? testJSON : testHTML;
  const d = only ? describe.only : describe;

  return d(name, tested);
}

testResort.only = (...args) => testResort(...args, true);
