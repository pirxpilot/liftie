var assert = require('assert');
var sorter = require('../../lib/routes/sorter');

/*global describe, it*/


function id2resorts(commaSeparatedIds) {
  return commaSeparatedIds.split(',').map(function(id) {
    return { id: id };
  });
}

describe('sorter', function() {

	it('should mark all as open if no cookie', function() {
    var resorts = id2resorts('a,b,c,d,e');

    resorts = sorter(resorts, {});

    resorts.forEach(function(r) {
      assert.ok(r.open);
    });
  });

  it('should mark none as open if empty cookie', function() {
    var resorts = id2resorts('a,b,c,d,e');

    resorts = sorter(resorts, {
      'resorts-open': ''
    });

    resorts.forEach(function(r) {
      assert.ok(!r.open);
    });
  });

  it('should mark none as open if cookie has unknown names', function() {
    var resorts = id2resorts('a,b,c,d,e');

    resorts = sorter(resorts, {
      'resorts-open': 'x,y'
    });

    resorts.forEach(function(r) {
      assert.ok(!r.open);
    });
  });


  it('should mark mark and sort if cookie present', function() {
    var resorts = id2resorts('a,b,c,d,e');

    resorts = sorter(resorts, {
      'resorts-open': 'e,b'
    });

    assert.equal(resorts[0].id, 'b');
    assert.ok(resorts[0].open);
    assert.equal(resorts[1].id, 'e');
    assert.ok(resorts[1].open);
    assert.equal(resorts[2].id, 'a');
    assert.ok(!resorts[2].open);
    assert.equal(resorts[3].id, 'c');
    assert.ok(!resorts[3].open);
    assert.equal(resorts[4].id, 'd');
    assert.ok(!resorts[4].open);
  });

  it('should update resort status', function() {
    var resorts = id2resorts('a,b');

    resorts[0].open = true;

    resorts = sorter(resorts, {
      'resorts-open': 'b'
    });

    assert.equal(resorts[0].id, 'b');
    assert.ok(resorts[0].open);
    assert.equal(resorts[1].id, 'a');
    assert.ok(!resorts[1].open);
  });

});
