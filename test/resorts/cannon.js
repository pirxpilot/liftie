var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/cannon');

/*global describe, it */
describe('parse cannon', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/cannon.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        '70-Passenger Aerial Tramway': 'closed',
        'Brookside Triple Chair': 'closed',
        'Cannonball Express Quad Chair': 'closed',
        'Eagle Cliff Triple Chair': 'closed',
        'Magic Carpet': 'closed',
        'Peabody Express Quad Chair': 'closed',
        'Huckerbrook Handle Tow': 'closed',
        'Tuckerbrook Quad Chair': 'closed',
        'Zoomer Triple Chair': 'closed',
        'Mittersill Double Chair': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});
