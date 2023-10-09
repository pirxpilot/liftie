const test = require('node:test');
const assert = require('node:assert/strict');
const { createReadStream } = require('fs');

const parser = require('../../lib/lifts/parser');
const makeParse = require('../../lib/lifts/parse');

module.exports = testResort;

function testResort(name, ext, expected, opts = {}) {

  const filename = `${__dirname}/../resorts/example/${name}.${ext}`;
  const parse = makeParse(name);


  function testHTML(t, done) {
    const stream = createReadStream(filename);

    stream.on('error', done);
    stream.pipe(parser(parse, function (err, status) {
      assert.ifError(err);
      assert.deepEqual(status, expected, `lifts should match for ${name}`);
      done();
    }));
  }

  function testJSON(t, done) {
    const asyncParse = parse.isAsync ?
      parse :
      (data, fn) => process.nextTick(fn, null, parse(data));

    const data = require(filename);

    asyncParse(data, function (err, status) {
      assert.deepEqual(status, expected);
      done(err);
    });
  }


  const tested = ext === 'json' ? testJSON : testHTML;
  test(`${name} should return lift status`, opts, tested);
}

testResort.only = (...args) => testResort(...args, { only: true });
testResort.skip = (...args) => testResort(...args, { skip: true });
