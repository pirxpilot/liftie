var test = require('tape');
var check = require('../lib/checker');

test('stats should return valid names when requested not specified', function(t) {
  var valid = ['a', 'b', 'c'];
  valid.forEach(function (v) {
    valid[v] = true;
  });
  t.deepEqual(check(null, valid, valid), valid);
  t.end();
});

test('stats should filter out invalid names', function(t) {
  var valid = ['a', 'b', 'c'];
  valid.forEach(function (v) {
    valid[v] = true;
  });
  t.deepEqual(check('a', valid), ['a']);
  t.deepEqual(check('a,x,c', valid), ['a', 'c']);
  t.deepEqual(check('x,y,z', valid), []);
  t.end();
});

test('stats should work with Arrays', function(t) {
  var valid = ['a', 'b', 'c'];
  valid.forEach(function (v) {
    valid[v] = true;
  });
  t.deepEqual(check(['a'], valid), ['a']);
  t.deepEqual(check(['a', 'x', 'c'], valid), ['a', 'c']);
  t.deepEqual(check(['x', 'y', 'z'], valid), []);
  t.end();
});
