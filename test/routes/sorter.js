var test = require('tape');
var sorter = require('../../lib/routes/sorter');

function id2resorts(commaSeparatedIds) {
  return commaSeparatedIds.split(',').map(function(id) {
    return {
      id: id,
      name: id.toUpperCase()
    };
  });
}

test('sorter should mark all as open if no cookie', function(t) {
  var resorts = id2resorts('a,b,c,d,e');

  resorts = sorter(resorts, {});

  resorts.forEach(function(r) {
    t.ok(r.open);
  });

  t.end();
});

test('sorter should mark none as open if no cookie and at least 5 resorts', function(t) {
  var resorts = id2resorts('a,b,c,d,e,f');

  resorts = sorter(resorts, {});

  resorts.forEach(function(r) {
    t.notOk(r.open);
  });

  t.end();
});

test('sorter should mark none as open if empty cookie', function(t) {
  var resorts = id2resorts('a,b,c,d,e');

  resorts = sorter(resorts, {
    'resorts-open': ''
  });

  resorts.forEach(function(r) {
    t.notOk(r.open);
  });

  t.end();
});

test('sorter should mark none as open if cookie has unknown names', function(t) {
  var resorts = id2resorts('a,b,c,d,e');

  resorts = sorter(resorts, {
    'resorts-open': 'x,y'
  });

  resorts.forEach(function(r) {
    t.notOk(r.open);
  });

  t.end();
});


test('sorter should mark mark and sort if cookie present', function(t) {
  var resorts = id2resorts('a,e,c,d,b');

  resorts = sorter(resorts, {
    'resorts-open': 'e,b'
  });

  t.equal(resorts[0].id, 'b');
  t.ok(resorts[0].open);
  t.equal(resorts[1].id, 'e');
  t.ok(resorts[1].open);
  t.equal(resorts[2].id, 'a');
  t.notOk(resorts[2].open);
  t.equal(resorts[3].id, 'c');
  t.notOk(resorts[3].open);
  t.equal(resorts[4].id, 'd');
  t.notOk(resorts[4].open);

  t.end();
});

test('sorter should update resort status', function(t) {
  var resorts = id2resorts('a,b');

  resorts[0].open = true;

  resorts = sorter(resorts, {
    'resorts-open': 'b'
  });

  t.equal(resorts[0].id, 'b');
  t.ok(resorts[0].open);
  t.equal(resorts[1].id, 'a');
  t.notOk(resorts[1].open);

  t.end();
});
