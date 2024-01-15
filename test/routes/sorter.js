const test = require('node:test');
const assert = require('node:assert/strict');
const sorter = require('../../lib/routes/sorter');

function id2resorts(commaSeparatedIds) {
  return commaSeparatedIds.split(',').map((id) => ({
      id,
      name: id.toUpperCase()
    }));
}

test('sorter should mark all as open if no cookie', () => {
  let resorts = id2resorts('a,b,c,d,e');

  resorts = sorter(resorts, {});

  resorts.forEach((r) => {
    assert.ok(r.open);
  });
});

test('sorter should mark none as open if no cookie and at least 5 resorts', () => {
  let resorts = id2resorts('a,b,c,d,e,f');

  resorts = sorter(resorts, {});

  resorts.forEach((r) => {
    assert.ok(!r.open);
  });
});

test('sorter should mark none as open if empty cookie', () => {
  let resorts = id2resorts('a,b,c,d,e');

  resorts = sorter(resorts, {
    'resorts-open': ''
  });

  resorts.forEach((r) => {
    assert.ok(!r.open);
  });
});

test('sorter should mark none as open if cookie has unknown names', () => {
  let resorts = id2resorts('a,b,c,d,e');

  resorts = sorter(resorts, {
    'resorts-open': 'x,y'
  });

  resorts.forEach((r) => {
    assert.ok(!r.open);
  });
});


test('sorter should mark mark and sort if cookie present', () => {
  let resorts = id2resorts('a,e,c,d,b');

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

test('sorter should update resort status', () => {
  let resorts = id2resorts('a,b');

  resorts[0].open = true;

  resorts = sorter(resorts, {
    'resorts-open': 'b'
  });

  assert.equal(resorts[0].id, 'b');
  assert.ok(resorts[0].open);
  assert.equal(resorts[1].id, 'a');
  assert.ok(!resorts[1].open);
});
