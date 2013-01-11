var assert = require('assert');
var tags = require('../../lib/routes/tags');

/*global describe, it*/


describe('tags', function() {
  it('should classify object according to tags', function() {
    var objs = {
      'a': 't1,t2,t3',
      'b': 't2',
      'c': 't1,t2',
      'd': ''
    };

    function load(name){
      return {
        id: name,
        tags: objs[name].split(',')
      };
    }

    var tt = tags(Object.keys(objs), load);

    assert.deepEqual(tt.t1.members, ['a', 'c']);
    assert.deepEqual(tt.t2.members, ['a', 'b', 'c']);
    assert.deepEqual(tt.t3.members, ['a']);
    assert.equal(Object.keys(tt).length, 3);
  });

  it('should conver names to cannonical form', function() {
    var objs = {
      'a': 'Nice Tag,Another Tag',
      'b': 'Another Tag',
    };

    function load(name){
      return {
        id: name,
        tags: objs[name].split(',')
      };
    }

    var tt = tags(Object.keys(objs), load);

    assert.deepEqual(tt['nice-tag'].members, ['a']);
    assert.deepEqual(tt['nice-tag'].label, 'Nice Tag');
    assert.deepEqual(tt['another-tag'].members, ['a', 'b']);
    assert.deepEqual(tt['another-tag'].label, 'Another Tag');
  });
});
