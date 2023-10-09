var test = require('node:test');
var assert = require('node:assert/strict');
var check = require('../lib/checker');

test('stats should return valid names when requested not specified', function () {
  var valid = ['a', 'b', 'c'];
  valid.forEach(function (v) {
    valid[v] = true;
  });
  assert.deepEqual(check(null, valid, valid), valid);
});

test('stats should filter out invalid names', function () {
  var valid = ['a', 'b', 'c'];
  valid.forEach(function (v) {
    valid[v] = true;
  });
  assert.deepEqual(check('a', valid), ['a']);
  assert.deepEqual(check('a,x,c', valid), ['a', 'c']);
  assert.deepEqual(check('x,y,z', valid), []);
});

test('stats should work with Arrays', function () {
  var valid = ['a', 'b', 'c'];
  valid.forEach(function (v) {
    valid[v] = true;
  });
  assert.deepEqual(check(['a'], valid), ['a']);
  assert.deepEqual(check(['a', 'x', 'c'], valid), ['a', 'c']);
  assert.deepEqual(check(['x', 'y', 'z'], valid), []);
});
