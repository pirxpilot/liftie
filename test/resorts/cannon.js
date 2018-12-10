var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('cannon');

/*global describe, it */
describe('parse cannon', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/cannon.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        '70-Passenger Aerial Tramway': 'closed',
        'Brookside Triple Chair': 'closed',
        'Cannonball Express Quad Chair': 'open',
        'Eagle Cliff Triple Chair': 'closed',
        'Magic Carpet': 'closed',
        'Peabody Express Quad Chair': 'open',
        'Huckerbrook Handle Tow': 'closed',
        'Tuckerbrook Quad Chair': 'open',
        'Zoomer Triple Chair': 'open',
        'Mittersill Double Chair': 'closed',
        'Valar T-Bar': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});
