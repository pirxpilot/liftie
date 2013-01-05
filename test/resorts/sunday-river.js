var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/sunday-river').parse;

/*global describe, it */
describe('parse sunday-river', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/sunday-river.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Little White Cap Quad': 'scheduled',
        'White Heat Quad': 'scheduled',
        'White Cap Quad': 'scheduled',
        'Locke Mountain Triple': 'scheduled',
        'Barker Mountain Express': 'scheduled',
        'Spruce Peak Triple': 'scheduled',
        'Chondola': 'scheduled',
        'South Ridge Express': 'scheduled',
        'Sundance Surface Lift': 'scheduled',
        'North Peak Express': 'scheduled',
        'Quantum Leap Triple': 'scheduled',
        'Aurora Peak Quad': 'scheduled',
        'OZ Quad': 'scheduled',
        'Jordan Bowl Express': 'scheduled',
        'Jordan Mountain Double': 'scheduled'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});