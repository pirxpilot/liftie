var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/sunday-river');

/*global describe, it */
describe('parse sunday-river', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/sunday-river.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Little White Cap Quad': 'open',
        'White Heat Quad': 'hold',
        'White Cap Quad': 'open',
        'Locke Mountain Triple': 'closed',
        'Barker Mountain Express': 'open',
        'Spruce Peak Triple': 'open',
        'Chondola': 'open',
        'South Ridge Express': 'open',
        'Sundance Surface Lift': 'open',
        'North Peak Express': 'open',
        'Quantum Leap Triple': 'closed',
        'Aurora Peak Quad': 'open',
        'OZ Quad': 'closed',
        'Jordan Bowl Express': 'open',
        'Jordan Mountain Double': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});