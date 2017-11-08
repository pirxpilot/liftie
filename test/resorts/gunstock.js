var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('gunstock');

/*global describe, it */
describe('parse gunstock', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/gunstock.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Flying Carpet': 'closed',
        'Panorama High Speed Quad': 'closed',
        'Penny Pitou Silver Medal Quad': 'closed',
        'Pistol Triple': 'closed',
        'Ramrod Quad': 'closed',
        'Tiger Triple': 'closed',
        'Wonder Carpet': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});
