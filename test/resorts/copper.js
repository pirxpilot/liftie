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
      'KC': 'closed',
      'Kokomo Express': 'closed',
      'Lumberjack': 'closed',
      'Mountain Chief': 'closed',
      'Pitchfork/Gem': 'closed',
      'Rendezvous': 'closed',
      'Resolution': 'closed',
      'Rugrat/Slingshot/Glide': 'closed',
      'Sierra': 'closed',
      'Slingshot': 'closed',
      'Stinger': 'closed',
      'Storm King': 'closed',
      'Super Bee': 'closed',
      'Timberline Express': 'closed',
      'Tucker Snowcat': 'closed',
      'Union Creek': 'closed'
    };
    parse(data).should.eql(expected);
  });
});
