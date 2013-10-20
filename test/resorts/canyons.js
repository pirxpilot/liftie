var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/canyons');

/*global describe, it */
describe('parse canyons', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/canyons.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Canyons Cabriolet': 'open',
        'Waldorf Gondola': 'open',
        'Sunrise': 'open',
        'Iron Mountain Express': 'open',
        'Peak 5': 'open',
        'Ninety-Nine 90 Express': 'open',
        'Super Condor Express': 'open',
        'Sun Peak Express': 'open',
        'Rip Cord': 'open',
        'Sweet Pea': 'open',
        'Short Cut': 'open',
        'Saddleback Express': 'open',
        'Timberline': 'open',
        'Tombstone Express': 'open',
        'High Meadow': 'open',
        'Orange Bubble Express': 'open',
        'Red Pine Gondola': 'open',
        'DreamCatcher': 'open',
        'DreamScape': 'open',
        'Day Break': 'open',
        'Flat Iron': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});