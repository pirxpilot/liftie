var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parseHeavenly = require('../../lib/resorts/heavenly');

/*global describe, it */
describe('parse heavenly', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/heavenly.html');
    stream.on('error', done);
    stream.pipe(parser(parseHeavenly, function(err, status) {
      var expected = {
        'Aerial Tram': 'open',
        'Big Easy': 'open',
        'Boulder': 'open',
        'Canyon Express': 'open',
        'Comet Express': 'open',
        'Dipper Express': 'open',
        'First Ride': 'open',
        'Galaxy': 'open',
        'Gondola': 'open',
        'Groove': 'open',
        'Gunbarrel Express ': 'open',
        'Mott Canyon': 'open',
        'North Bowl': 'open',
        'Olympic Express': 'open',
        'Patsy\'s': 'open',
        'Powderbowl Express': 'open',
        'Sky Express': 'open',
        'Stagecoach Express': 'open',
        'Surface Lifts CA (3)': 'open',
        'Surface Lifts NV (3)': 'open',
        'Tamarack Express': 'open',
        'Tubing Lift (skiing and riding only)': 'open',
        'World Cup': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});