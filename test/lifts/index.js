import assert from 'node:assert/strict';
import { createReadStream, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import makeParse from '../../lib/lifts/parse.js';
import parser from '../../lib/lifts/parser.js';

export default async function testResort(name, ext, expected, opts = {}) {
  const filename = resolve(import.meta.dirname, `../resorts/example/${name}.${ext}`);
  const parse = await makeParse(name);

  function testHTML(_t, done) {
    const stream = createReadStream(filename);

    stream.on('error', done);
    stream.pipe(
      parser(parse, (err, status) => {
        assert.ifError(err);
        assert.deepEqual(status, expected, `lifts should match for ${name}, received: ${JSON.stringify(status)}`);
        done();
      })
    );
  }

  function testJSON(_t, done) {
    const asyncParse = parse.isAsync ? parse : (data, fn) => process.nextTick(fn, null, parse(data));

    const data = JSON.parse(readFileSync(filename, 'utf8'));

    asyncParse(data, (err, status) => {
      assert.deepEqual(status, expected);
      done(err);
    });
  }

  const tested = ext === 'json' ? testJSON : testHTML;
  test(`${name} should return lift status`, opts, tested);
}

testResort.only = (...args) => testResort(...args, { only: true });
testResort.skip = (...args) => testResort(...args, { skip: true });
