var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/waterville').parse;

/*global describe, it */
describe('parse waterville', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/waterville.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'High Country Double Chair': 'open',
        'Exhibition Poma': 'open',
        'Northside Double Chair': 'open',
        'Sunnyside Triple Chair': 'open',
        'White Peak Express Quad': 'open',
        'Valley Run Quad': 'open',
        'Pasture J-Bar': 'open',
        'World Cup T-Bar': 'open',
        'Lower Meadows Double Chair': 'open',
        'World Cup Triple Chair': 'open',
        'Kinderpark Lift*': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});