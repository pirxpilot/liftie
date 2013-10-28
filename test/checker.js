var should = require('should');
var check = require('../lib/checker');

/*global describe, it*/

describe('stats', function() {
  it('should return valid names when requested not specified', function() {
    var valid = ['a', 'b', 'c'];
    valid.forEach(function (v) {
      valid[v] = true;
    });
    check(null, valid).should.eql(valid);
  });
  it('should filter out invalid names', function() {
    var valid = ['a', 'b', 'c'];
    valid.forEach(function (v) {
      valid[v] = true;
    });
    check('a', valid).should.eql(['a']);
    check('a,x,c', valid).should.eql(['a', 'c']);
    check('x,y,z', valid).should.eql([]);
  });
  it('should work with Arrays', function() {
    var valid = ['a', 'b', 'c'];
    valid.forEach(function (v) {
      valid[v] = true;
    });
    check(['a'], valid).should.eql(['a']);
    check(['a', 'x', 'c'], valid).should.eql(['a', 'c']);
    check(['x', 'y', 'z'], valid).should.eql([]);
  });
});