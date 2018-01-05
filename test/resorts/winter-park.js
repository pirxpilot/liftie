var parse = require('../../lib/lifts/parse')('winter-park');

/*global describe, it */
describe('parse winter-park', function() {

  it('should return lift status', function() {
    var data = require('./example/winter-park.json');
    var expected = {
      'Arrow': 'open',
      'Challenger': 'open',
      'Comet': 'open',
      'Discovery': 'open',
      'Eagle Wind': 'closed',
      'Endeavour': 'open',
      'Eskimo Express': 'open',
      'Galloping Goose': 'open',
      'Gemini Express': 'open',
      'Hi-Lonesome Express': 'open',
      'Iron Horse': 'closed',
      'Lariat': 'open',
      'Looking Glass': 'open',
      'Meteor': 'open',
      'Olympia Express': 'open',
      'Panoramic Express': 'open',
      'Pioneer Express': 'open',
      'Pony Express': 'open',
      'Prospector Express': 'open',
      'Spirit': 'open',
      'Sunnyside': 'open',
      'Super Gauge Express': 'open',
      'Cabriolet': 'open',
      'Zephyr Express': 'open'
    };
    parse(data).should.eql(expected);
  });
});
