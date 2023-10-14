const test = require('node:test');
const assert = require('node:assert/strict');
const check = require('../lib/checker');

test('stats should return valid names when requested not specified', function () {
  const valid = ['a', 'b', 'c'];
  valid.forEach(function (v) {
    valid[v] = true;
  });
  assert.deepEqual(check(null, valid, valid), valid);
});

test('stats should filter out invalid names', function () {
  const valid = ['a', 'b', 'c'];
  valid.forEach(function (v) {
    valid[v] = true;
  });
  assert.deepEqual(check('a', valid), ['a']);
  assert.deepEqual(check('a,x,c', valid), ['a', 'c']);
  assert.deepEqual(check('x,y,z', valid), []);
});

test('stats should work with Arrays', function () {
  const valid = ['a', 'b', 'c'];
  valid.forEach(function (v) {
    valid[v] = true;
  });
  assert.deepEqual(check(['a'], valid), ['a']);
  assert.deepEqual(check(['a', 'x', 'c'], valid), ['a', 'c']);
  assert.deepEqual(check(['x', 'y', 'z'], valid), []);
});
