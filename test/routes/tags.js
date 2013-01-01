var assert = require('assert');
var tags = require('../../lib/routes/tags');

/*global describe, it*/


describe('sorter', function() {

	it('should create <all> tag with the names of all passed items', function() {
    function load(name) {
      return {
        id: name
      };
    }
    var names = ['a', 'b', 'c'];
    var tt = tags(names, load);

    assert.equal(Object.keys(tt).length, 1);
    assert.deepEqual(tt.all, names);
  });

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

    assert.deepEqual(tt.all, ['a', 'b', 'c', 'd']);
    assert.deepEqual(tt.t1, ['a', 'c']);
    assert.deepEqual(tt.t2, ['a', 'b', 'c']);
    assert.deepEqual(tt.t3, ['a']);
    assert.equal(Object.keys(tt).length, 4);
  });

});
