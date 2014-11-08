var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/brighton');

/*global describe, it */
describe('parse brighton', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/brighton.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Crest Express': 'closed',
        'Explorer': 'closed',
        'Great Western Express': 'closed',
        'Milly Express': 'closed',
        'Snake Creek Express': 'closed',
        'Majestic Quad': 'closed',
        'Terrain Park': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});