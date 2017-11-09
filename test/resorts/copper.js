var parse = require('../../lib/lifts/parse')('copper');

/*global describe, it */
describe('parse copper', function() {

  it('should return lift status', function() {
    var data = require('./example/copper.json');
    var expected = {
      'Alpine': 'closed',
      'American Eagle': 'closed',
      'American Flyer': 'closed',
      'Black Jack': 'closed',
      'Celebrity Ridge': 'closed',
      'Easy Rider': 'closed',
      'Excelerator': 'closed',
      'Gem': 'closed',
      'Kokomo': 'closed',
      'Lumberjack': 'closed',
      'Mountain Chief': 'closed',
      'Pitchfork': 'closed',
      'Rendezvous': 'closed',
      'Resolution': 'closed',
      'Rugrat': 'closed',
      'Sierra': 'closed',
      'Slingshot': 'closed',
      'Stinger': 'closed',
      'Storm King': 'closed',
      'Super Bee': 'closed',
      'The Glide': 'closed',
      'Timberline Express': 'closed',
      'Tucker Cat': 'closed',
      'Union Creek High Speed Quad': 'closed'
    };
    parse(data).should.eql(expected);
  });
});
