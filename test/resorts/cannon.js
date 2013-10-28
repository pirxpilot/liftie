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
        '70-Passenger Aerial Tramway': 'open',
        'Brookside Triple Chair': 'open',
        'Cannonball Express Quad Chair': 'open',
        'Eagle Cliff Triple Chair': 'open',
        'Magic Carpet': 'open',
        'Peabody Express Quad Chair': 'open',
        'Huckerbrook Handle Tow': 'open',
        'Tuckerbrook Quad Chair': 'open',
        'Zoomer Triple Chair': 'open',
        'Mittersill Double Chair': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});