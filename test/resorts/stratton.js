var parse = require('../../lib/lifts/parse')('stratton');

/*global describe, it */
describe('parse stratton', function() {

  it('should return lift status', function() {
    var data = require('./example/stratton.json');
    var expected = {
      'Gondola': 'closed',
      'American Express': 'closed',
      'URSA Express': 'closed',
      'Cub Carpet': 'open',
      'Sunrise Express': 'closed',
      'Shooting Star': 'closed',
      'Snow Bowl': 'closed',
      'Solstice': 'closed',
      'South American': 'closed',
      'Tamarack': 'closed',
      'Villager': 'closed'
    };
    parse(data).should.eql(expected);
  });
});
