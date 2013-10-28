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
        'Gondola': 'open',
        'Am. Express': 'open',
        'URSA Express': 'open',
        'Cub Carpet': 'open',
        'Sunrise Express': 'open',
        'Shooting Star': 'open',
        'Snow Bowl': 'closed',
        'Solstice': 'closed',
        'S. American': 'closed',
        'Tamarack': 'open',
        'Villager': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});