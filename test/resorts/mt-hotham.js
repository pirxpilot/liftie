const parse = require('../../lib/lifts/parse')('mt-hotham');

/*global describe, it */
describe('parse mt-hotham', function() {
  it('should return lift status', function() {
    const data = require('./example/mt-hotham.json');
    const expected = {
      'Audi Quattro': 'closed',
      'Big D': 'closed',
      'Blue Ribbon': 'closed',
      'The Drift': 'closed',
      'Gotcha': 'closed',
      'Heavenly Valley': 'closed',
      'Keogh\'s': 'closed',
      'Orchard': 'closed',
      'Playground': 'closed',
      'Road Runner': 'closed',
      'Summit': 'closed',
      'Summit Trainer': 'closed',
      'Dinner Plain': 'closed',
    };
    parse(data).should.eql(expected);
  });
});
