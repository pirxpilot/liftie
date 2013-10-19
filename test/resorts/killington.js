var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/killington');

/*global describe, it */
describe('parse killington', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/killington.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Bear Mountain Quad': 'scheduled',
        'Canyon Quad': 'scheduled',
        'K-1 Express Gondola': 'scheduled',
        'North Ridge Triple': 'scheduled',
        'Ramshead Express Quad': 'scheduled',
        'Snowplay Carpet I': 'scheduled',
        'Snowplay Carpet II': 'closed',
        'Snowplay Rope Tow': 'closed',
        'Needle\'s Eye Express Quad': 'scheduled',
        'Northbrook Quad': 'scheduled',
        'Skye Peak Express': 'scheduled',
        'Skyeship Express Gondola Stage I': 'scheduled',
        'Skyeship Express Gondola Stage II': 'scheduled',
        'Superstar Express Quad': 'scheduled',
        'Snowdon Poma': 'scheduled',
        'Snowdon Quad': 'scheduled',
        'Snowdon Triple': 'closed',
        'Learn to Snowboard Carpet': 'scheduled',
        'Snowshed 1': 'closed',
        'Snowshed 2': 'closed',
        'Snowshed Express Quad': 'scheduled',
        'Sunrise Village Triple': 'scheduled'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});