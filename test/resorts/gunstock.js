var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/gunstock');

/*global describe, it */
describe('parse gunstock', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/gunstock.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Flying Carpet': 'open',
        'Panorama High Speed Quad': 'open',
        'Penny Pitou Silver Medal Quad': 'open',
        'Pistol Triple': 'open',
        'Ramrod Quad': 'open',
        'Tiger Triple': 'open',
        'Wonder Carpet': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});