var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('killington');

/*global describe, it */
describe('parse killington', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/killington.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Bear Mountain Quad': 'closed',
        'Canyon Quad': 'closed',
        'K-1 Express Gondola': 'closed',
        'North Ridge Triple': 'closed',
        'Ramshead Express Quad': 'closed',
        'Snowplay Carpet I': 'closed',
        'Snowplay Carpet II': 'closed',
        'Needle\'s Eye Express Quad': 'closed',
        'Northbrook Quad': 'closed',
        'Skye Peak Express': 'closed',
        'Skyeship Express Gondola Stage I': 'closed',
        'Skyeship Express Gondola Stage II': 'closed',
        'Superstar Express Quad': 'closed',
        'Snowdon Poma': 'closed',
        'Snowdon Quad': 'closed',
        'Snowdon Triple': 'closed',
        'Learn to Snowboard Carpet': 'closed',
        'Snowshed 1': 'closed',
        'Snowshed 2': 'closed',
        'Snowshed Express Quad': 'closed',
        'Sunrise Village Triple': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});