var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/stratton');

/*global describe, it */
describe('parse stratton', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/stratton.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Gondola': 'scheduled',
        'American Express': 'open',
        'URSA Express': 'open',
        'Cub Carpet': 'open',
        'Sunrise Express': 'closed',
        'Shooting Star': 'open',
        'Snow Bowl': 'scheduled',
        'Solstice': 'closed',
        'South American': 'closed',
        'Tamarack': 'open',
        'Teddy Bear': 'open',
        'Villager': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});
