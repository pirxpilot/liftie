var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parseAlpine = require('../../lib/resorts/alpine');

/*global describe, it */
describe('parse alpine', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/alpine.html');
    stream.on('error', done);
    stream.pipe(parser(parseAlpine, function(err, status) {
      var expected = {
        'Summit Express': 'closed',
        'Roundhouse Express': 'closed',
        'Hot Wheels Chair': 'closed',
        'Scott Chair': 'closed',
        'Lakeview Chair': 'closed',
        'Yellow Chair': 'closed',
        'Meadow Chair': 'closed',
        'Subway Chair': 'closed',
        'Kangaroo Chair': 'closed',
        'Alpine Bowl Chair': 'closed'
      };
      should.exist(expected);
      status.should.eql(expected);
      done(err);
    }));
  });
});