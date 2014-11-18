var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/winter-park');

/*global describe, it */
describe('parse winter-park', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/winter-park.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Arrow': 'open',
        'Challenger': 'open',
        'Comet': 'closed',
        'Discovery': 'open',
        'Eagle Wind': 'closed',
        'Endeavour': 'closed',
        'Eskimo Express': 'open',
        'Galloping Goose': 'open',
        'Gemini Express': 'open',
        'Hi-Lonesome Express': 'open',
        'Iron Horse': 'closed',
        'Lariat': 'open',
        'Looking Glass': 'open',
        'Meteor': 'open',
        'Mt. Maury': 'open',
        'Olympia Express': 'open',
        'Panoramic Express': 'open',
        'Pioneer Express': 'open',
        'Pony Express': 'closed',
        'Prospector Express': 'open',
        'Spirit': 'open',
        'Sunnyside': 'open',
        'Super Gauge Express': 'open',
        'Village Cabriolet': 'open',
        'Zephyr Express': 'open'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});