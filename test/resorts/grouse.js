var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('grouse');

/*global describe, it */
describe('parse grouse', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/grouse.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Olympic Express High-Speed Quad Chair': 'scheduled',
        'Peak Quad Chair': 'scheduled',
        'Screaming Eagle High-Speed Quad Chair': 'scheduled',
        'Greenway Quad Chair': 'scheduled',
        'Magic Carpet': 'scheduled'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});
