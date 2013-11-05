var stats = require('../../lib/lifts/stats');

/*global describe, it*/

describe('stats', function() {
  it('should report 0 for empty', function() {
    stats({}).should.eql({
      open: 0,
      closed: 0,
      hold: 0,
      scheduled: 0,
      percentage: {
        open: 25,
        closed: 25,
        hold: 25,
        scheduled: 25
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
    stats(status).should.eql({
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