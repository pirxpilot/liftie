const test = require('tape');
const { createReadStream } = require('fs');

const parser = require('../../lib/conditions/parser');
const makeParse = require('../../lib/conditions/parse');

module.exports = testResort;

function testResort(name, ext, expected, only = false) {

  const filename = `${__dirname}/../resorts/example/${name}-conditions.${ext}`;
  const parse = makeParse(name);


  function testHTML(t) {
    const stream = createReadStream(filename);

    stream.on('error', t.end);
    stream.pipe(parser(parse, function(err, status) {
      t.deepEqual(status, expected, `conditions should match for ${name}`);
      t.end(err);
    }));
  }

  function testJSON(t) {
    const asyncParse = parse.isAsync ?
      parse :
      (data, fn) => process.nextTick(fn, null, parse(data));

    const data = require(filename);

    asyncParse(data, function(err, status) {
      t.deepEqual(status, expected);
      t.end(err);
    });
  }


  const tested = ext === 'json' ? testJSON : testHTML;
  const runTest = only ? test.only : test;

  runTest(`${name} should return conditions`, tested);
}

testResort.only = (...args) => testResort(...args, true);
