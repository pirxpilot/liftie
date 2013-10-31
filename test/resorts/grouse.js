var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/grouse');

/*global describe, it */
describe('parse grouse', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/grouse.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Olympic Express High-Speed Quad': 'open',
        'Peak Quad': 'scheduled',
        'Screaming Eagle High-Speed Quad': 'open',
        'Greenway Quad': 'open',
        'Magic Carpet': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});