var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('camelback');


/*global describe, it */
describe('parse camelback', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/camelback.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Bailey': 'closed',
        'Marc Antony': 'open',
        'Sunbowl I': 'open',
        'Sunbowl II': 'closed',
        'The Glen': 'open',
        'Cleopatra': 'closed',
        'Meadows': 'open',
        'Raceway': 'closed',
        'Stevenson Express': 'open',
        'Sullivan Express': 'open',
        'Beginner Carpet I': 'open',
        'Beginner Carpet II': 'closed',
        'Coolmoor Carpet': 'open',
        'Sunkid Carpet': 'open',
        'Tubing I': 'closed',
        'Tubing II': 'open'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
