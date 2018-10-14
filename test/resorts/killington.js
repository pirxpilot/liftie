var parse = require('../../lib/lifts/parse')('killington');

/*global describe, it */
describe('parse killington', function() {

  it('should return lift status', function() {
    var data = require('./example/killington.json');
    var expected = {
      'Bear Mountain Quad': 'closed',
      'Canyon Quad': 'closed',
      'K-1 Express Gondola': 'open',
      'North Ridge Triple': 'closed',
      'Ramshead Express Quad': 'open',
      'Snowplay Carpet I': 'closed',
      'Snowplay Carpet II': 'closed',
      'Needles Eye Express Quad': 'closed',
      'North Brook Quad': 'closed',
      'Skye Peak Express Quad': 'closed',
      'Skyeship Express Gondola Stage I': 'closed',
      'Skyeship Express Gondola Stage II': 'closed',
      'Superstar Express Quad': 'closed',
      'Snowdon Poma': 'closed',
      'Snowdon Quad': 'closed',
      'Snowdon Triple': 'closed',
      'Learn To Carpet': 'closed',
      'Snowshed  Double': 'closed',
      'Snowshed Express Quad': 'open',
      'Sunrise Village Triple': 'closed',
      'Tubing Park Tow': 'closed'
    };
    parse(data).should.eql(expected);
  });
});
