var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/mthood');

/*global describe, it */
describe('parse mthood', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/mthood.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Ballroom Carpet': 'closed',
        'Buttercup': 'closed',
        'Daisy': 'closed',
        'Mt Hood Express': 'closed',
        'Shooting Star Express': 'closed',
        'Hood River Express': 'closed',
        'Cascade Express': 'closed',
        'Heather Canyon': 'closed',
        'Easy Rider': 'closed',
        'Stadium Express': 'closed',
        'Blue': 'closed',
        'Vista Express': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});