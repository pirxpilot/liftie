var parse = require('../../lib/lifts/parse')('pico');

/*global describe, it */
describe('parse pico', function() {

  it('should return lift status', function() {
    var data = require('./example/pico.json');
    var expected = {
      'Bonanza Double': 'closed',
      'Bonanza Rope Tow': 'closed',
      'Golden Express Quad': 'closed',
      'Gnomes Knoll Triple': 'closed',
      'Little Pico Triple': 'closed',
      'Outpost Double': 'closed',
      'Summit Express Quad': 'closed'
    };
    parse(data).should.eql(expected);
  });
});

