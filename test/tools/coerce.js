var assert = require('assert');
var coerce = require('../../lib/tools/coerce');

/*global describe, it*/

describe('coerce', function() {
  it('should report "scheduled" when in doubt', function() {
    assert.equal(coerce(''), 'scheduled');
    assert.equal(coerce('unknown'), 'scheduled');
    assert.equal(coerce('5'), 'scheduled');
  });
  it('should coerce usual suspects', function() {
    assert.equal(coerce('open'), 'open');
    assert.equal(coerce('Open'), 'open');
    assert.equal(coerce('closed'), 'closed');
    assert.equal(coerce('Scheduled'), 'scheduled');
    assert.equal(coerce('delayed'), 'scheduled');
    assert.equal(coerce('wind hold'), 'hold');
    assert.equal(coerce('Maintenance-hold'), 'hold');
    assert.equal(coerce('On_Hold'), 'hold');
  });
  it('should slice if needed', function() {
    assert.equal(coerce('open.gif', 0, -4), 'open');
    assert.equal(coerce('status-open', 6), 'open');
    assert.equal(coerce('/path/Open.png', 6, -4), 'open');
  });
  it('should slice if needed', function() {
    assert.equal(coerce('open.gif', 0, '.gif'), 'open');
    assert.equal(coerce('status-open', '-'), 'open');
    assert.equal(coerce('/path/Open.png', '/', '.png'), 'open');
    assert.equal(coerce('/path/Open.png', 6, '.png'), 'open');
    assert.equal(coerce('/path/Open.png', '/', -4), 'open');
  });
});