var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/shawnee-mountain');

/*global describe, it */
describe('parse shawnee-mountain', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/shawnee-mountain.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'B. Arrowhead - Quad': 'closed',
        'C. Tomahawk - Express': 'closed',
        'D. Tecumseh - Double': 'closed',
        'E. Lookout - Double': 'closed',
        'F. Bushkill - Double': 'closed',
        'G. Little Chief - Double': 'closed',
        'H. Little Chief - Carpet': 'closed',
        'I. Learning Center - Carpet': 'closed',
        'SKIwee - Carpet': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});