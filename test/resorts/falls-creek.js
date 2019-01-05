var parse = require('../../lib/lifts/parse')('falls-creek');

/*global describe, it */
describe('parse falls-creek', function() {

  it('should return lift status', function() {
    var data = require('./example/falls-creek.json');
    var expected = {
      'Halleys Comet': 'closed',
      'Towers Chair': 'closed',
      'Drovers Dream Chair': 'closed',
      'Board Walk': 'closed',
      'Mouse Trap': 'closed',
      'Monkey Bars ': 'closed',
      'Petes Train ': 'closed',
      'Gully Chair': 'closed',
      'Eagle Express': 'closed',
      'Scotts Chair': 'closed',
      'Ruined Castle Chair': 'closed',
      'Summit Chair': 'closed',
      'Lakeside Poma': 'closed',
      'International Poma': 'closed'
    };
    parse(data).should.eql(expected);
  });
});
