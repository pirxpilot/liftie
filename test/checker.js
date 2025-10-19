import assert from 'node:assert/strict';
import test from 'node:test';
import check from '../lib/checker.js';

test('stats should return valid names when requested not specified', () => {
  const valid = ['a', 'b', 'c'];
  valid.forEach(v => {
    valid[v] = true;
  });
  assert.deepEqual(check(null, valid, valid), valid);
});

test('stats should filter out invalid names', () => {
  const valid = ['a', 'b', 'c'];
  valid.forEach(v => {
    valid[v] = true;
  });
  assert.deepEqual(check('a', valid), ['a']);
  assert.deepEqual(check('a,x,c', valid), ['a', 'c']);
  assert.deepEqual(check('x,y,z', valid), []);
});

test('stats should work with Arrays', () => {
  const valid = ['a', 'b', 'c'];
  valid.forEach(v => {
    valid[v] = true;
  });
  assert.deepEqual(check(['a'], valid), ['a']);
  assert.deepEqual(check(['a', 'x', 'c'], valid), ['a', 'c']);
  assert.deepEqual(check(['x', 'y', 'z'], valid), []);
});
