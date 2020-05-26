var test = require('tape');
var coerce = require('../../lib/tools/coerce');

test('coerce should report "scheduled" when in doubt', function(t) {
  t.equal(coerce(''), 'scheduled');
  t.equal(coerce('unknown'), 'scheduled');
  t.equal(coerce('5'), 'scheduled');
  t.end();
});

test('coerce should coerce usual suspects', function(t) {
  t.equal(coerce('open'), 'open');
  t.equal(coerce('Open'), 'open');
  t.equal(coerce('closed'), 'closed');
  t.equal(coerce('Scheduled'), 'scheduled');
  t.equal(coerce('delayed'), 'scheduled');
  t.equal(coerce('wind hold'), 'hold');
  t.equal(coerce('Maintenance-hold'), 'hold');
  t.equal(coerce('On_Hold'), 'hold');
  t.end();
});

test('coerce should slice if needed', function(t) {
  t.equal(coerce('open.gif', 0, -4), 'open');
  t.equal(coerce('status-open', 6), 'open');
  t.equal(coerce('/path/Open.png', 6, -4), 'open');
  t.end();
});

test('coerce should slice if needed', function(t) {
  t.equal(coerce('open.gif', 0, '.gif'), 'open');
  t.equal(coerce('status-open', '-'), 'open');
  t.equal(coerce('/path/Open.png', '/', '.png'), 'open');
  t.equal(coerce('/path/Open.png', 6, '.png'), 'open');
  t.equal(coerce('/path/Open.png', '/', -4), 'open');
  t.end();
});
