var parse = require('../../lib/resorts/aspen-highlands');

/*global describe, it */
describe('parse aspen-highlands', function() {

  it('should return lift status', function() {
    var data = require('./example/aspen-highlands.json');
    var expected = {
      'Exhibition': 'closed',
      'Thunderbowl': 'closed',
      'Loge Peak': 'closed',
      'Cloud Nine': 'closed',
      'Deep Temerity': 'closed'
    };
    parse(data).should.eql(expected);
  });
});