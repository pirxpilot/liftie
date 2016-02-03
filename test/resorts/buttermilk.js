var parse = require('../../lib/resorts/buttermilk');

/*global describe, it */
describe('parse buttermilk', function() {

  it('should return lift status', function() {
    var data = require('./example/buttermilk.json');
    var expected = {
      'Summit Express': 'closed',
      'West Buttermilk Express': 'closed',
      'Tiehack Express': 'closed',
      'Panda Carpet': 'closed',
      'Mitey Carpet': 'closed'
    };
    parse(data).should.eql(expected);
  });
});