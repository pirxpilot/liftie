var parse = require('../../lib/lifts/parse')('king-pine');

/*global describe, it */
describe('parse king-pine', function() {

  it('should return lift status', function() {
    var data = require('./example/king-pine.json');
    var expected = {
      'Polar Bear Triple': 'open',
      'Black Bear Triple': 'open',
      'Powder Bear Triple': 'open',
      'Cubby Tow': 'open',
      'Bear Rug Carpet': 'open'
    };
    parse(data).should.eql(expected);
  });
});
