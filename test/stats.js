var assert = require('assert');
var stats = require('../lib/stats');

/*global describe, it*/

describe('stats', function() {
  it('should report 0 for empty', function() {
    assert.deepEqual(stats({}), {
      open: 0,
      closed: 0,
      hold: 0,
      scheduled: 0,
      percentage: {
        open: 0,
        closed: 0,
        hold: 0,
        scheduled: 0
      }
    });
  });
  it('should count all status', function() {
    var status = {
      'n1': 'open',
      'n2': 'open',
      'n3': 'closed',
      'n4': 'open',
      'n5': 'open',
      'n6': 'scheduled',
      'n7': 'open',
      'n8': 'closed',
      'n9': 'closed',
      'n11': 'hold',
      'n12': 'hold',
      'n13': 'closed',
      'n14': 'scheduled',
      'n17': 'scheduled'
    };
    assert.deepEqual(stats(status), {
      open: 5,
      closed: 4,
      hold: 2,
      scheduled: 3,
      percentage: {
        open: 35.7,
        closed: 28.5,
        hold: 14.2,
        scheduled: 21.4
      }
    });

  });
});