var parse = require('../../lib/lifts/parse')('boreal');

/*global describe, it */
describe('parse boreal', function() {

  it('should return lift status', function() {
    var data = require('./example/boreal.json');
    var expected = {
      'Castle Peak': 'closed',
      'Accelerator Express': 'closed',
      'Nugget': 'closed',
      '49er': 'closed',
      'Dutchman': 'closed',
      'Cedar Ridge': 'closed',
      'Mountain Explorer': 'closed',
      'Lil Carpet': 'closed'
    };
    parse(data).should.eql(expected);
  });
});
