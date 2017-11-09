var parse = require('../../lib/lifts/parse')('pats-peak');

/*global describe, it */
describe('parse boreal', function() {

  it('should return lift status', function() {
    var data = require('./example/pats-peak.json');
    var expected = {
      'Hurricane Triple Chair': 'closed',
      'Turbulence Triple Chair': 'closed',
      'Cascade Basin Triple Chair': 'closed',
      'Peak Double Chair': 'closed',
      'Vortex Double Chair': 'closed',
      'Valley Double Chair': 'closed',
      'Bluster Carpet': 'closed',
      'Gusty JBar': 'closed',
      'Beginner Tow I': 'closed',
      'Beginner Carpet': 'closed',
      'F5 Tow': 'closed'
    };
    parse(data).should.eql(expected);
  });
});
