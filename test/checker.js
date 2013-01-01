var assert = require('assert');
var check = require('../lib/checker');

/*global describe, it*/

describe('stats', function() {
  it('should return valid names when requested not specified', function() {
    var valid = ['a', 'b', 'c'];
    assert.deepEqual(check(null, valid), valid);
  });
  it('should filter out invalid names', function() {
    var valid = ['a', 'b', 'c'];
    assert.deepEqual(check('a', valid), ['a']);
    assert.deepEqual(check('a,x,c', valid), ['a', 'c']);
    assert.deepEqual(check('x,y,z', valid), []);
  });
  it('should work with Arrays', function() {
    var valid = ['a', 'b', 'c'];
    assert.deepEqual(check(['a'], valid), ['a']);
    assert.deepEqual(check(['a', 'x', 'c'], valid), ['a', 'c']);
    assert.deepEqual(check(['x', 'y', 'z'], valid), []);
  });
});