var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('sunday-river');

/*global describe, it */
describe('parse sunday-river', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/sunday-river.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Little White Cap Quad': 'closed',
        'White Heat Quad': 'closed',
        'White Cap Quad': 'closed',
        'Locke Mountain Triple': 'closed',
        'Barker Mountain Express': 'closed',
        'Spruce Peak Triple': 'closed',
        'Chondola': 'closed',
        'South Ridge Express': 'closed',
        'Sundance Surface Lift': 'closed',
        'North Peak Express': 'closed',
        'Quantum Leap Triple': 'closed',
        'Aurora Peak Quad': 'closed',
        'OZ Quad': 'closed',
        'Jordan Bowl Express': 'closed',
        'Jordan Mountain Double': 'closed',
        'Tubing Park': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
