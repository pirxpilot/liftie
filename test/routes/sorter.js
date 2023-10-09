var test = require('node:test');
var assert = require('node:assert/strict');
var sorter = require('../../lib/routes/sorter');

function id2resorts(commaSeparatedIds) {
  return commaSeparatedIds.split(',').map(function (id) {
    return {
      id: id,
      name: id.toUpperCase()
    };
  });
}

test('sorter should mark all as open if no cookie', function () {
  var resorts = id2resorts('a,b,c,d,e');

  resorts = sorter(resorts, {});

  resorts.forEach(function (r) {
    assert.ok(r.open);
  });
});

test('sorter should mark none as open if no cookie and at least 5 resorts', function () {
  var resorts = id2resorts('a,b,c,d,e,f');

  resorts = sorter(resorts, {});

  resorts.forEach(function (r) {
    assert.ok(!r.open);
  });
});

test('sorter should mark none as open if empty cookie', function () {
  var resorts = id2resorts('a,b,c,d,e');

  resorts = sorter(resorts, {
    'resorts-open': ''
  });

  resorts.forEach(function (r) {
    assert.ok(!r.open);
  });
});

test('sorter should mark none as open if cookie has unknown names', function () {
  var resorts = id2resorts('a,b,c,d,e');

  resorts = sorter(resorts, {
    'resorts-open': 'x,y'
  });

  resorts.forEach(function (r) {
    assert.ok(!r.open);
  });
});


test('sorter should mark mark and sort if cookie present', function () {
  var resorts = id2resorts('a,e,c,d,b');

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

test('sorter should update resort status', function () {
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
