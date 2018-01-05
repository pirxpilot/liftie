var parse = require('../../lib/lifts/parse')('steamboat');

/*global describe, it */
describe('parse steamboat', function() {

  it('should return lift status', function() {
    var data = require('./example/steamboat.json');
    var expected = {
      'Gondola': 'open',
      'Christie Peak Express': 'open',
      'Preview': 'open',
      'Bashor': 'open',
      'Thunderhead Express': 'open',
      'Burgess Creek': 'open',
      'Four Points': 'open',
      'Storm Peak Express': 'open',
      'Bar-UE': 'open',
      'Pony Express': 'closed',
      'Morningside': 'open',
      'Sundown Express': 'open',
      'Sunshine Express': 'open',
      'South Peak': 'open',
      'Elkhead Express': 'open',
      'Rough Rider': 'closed',
      'Christie III': 'closed',
      'Priest Creek': 'closed'
    };
    parse(data).should.eql(expected);
  });
});
