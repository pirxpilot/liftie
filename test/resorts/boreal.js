var parse = require('../../lib/resorts/boreal');

/*global describe, it */
describe('parse boreal', function() {

  it('should return lift status', function() {
    var data = require('./example/boreal.json');
    var expected = {
      'Castle Peak Quad': 'closed',
      'Accelerator Express Quad': 'closed',
      'Nugget': 'closed',
      '49er Triple': 'closed',
      'Flying Dutchman Triple': 'closed',
      'Cedar Ridge Triple': 'closed',
    };
    parse(data).should.eql(expected);
  });
});
