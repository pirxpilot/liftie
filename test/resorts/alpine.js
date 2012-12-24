var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parseAlpine = require('../../lib/resorts/alpine').parse;

/*global describe, it */
describe('parse alpine', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/alpine.html');
    stream.on('error', done);
    stream.pipe(parser(parseAlpine, function(err, status) {
      var expected = {
        'Summit Six Chair': 'hold',
        'Roundhouse Chair': 'closed',
        'Hot Wheels Chair': 'open',
        'Sherwood Express': 'closed',
        'Scott Chair': 'closed',
        'Lakeview Chair': 'closed',
        'Yellow Chair': 'hold',
        'Meadow Chair': 'open',
        'Subway Chair': 'open',
        'Kangaroo Chair': 'closed',
        'Alpine Bowl Chair': 'closed',
        'Big Carpet': 'scheduled',
        'Kids Camp Little Carpet': 'open'
      };

      assert.equal(status.length, Object.keys(expected).length);
      status.forEach(function(ls) {
        assert.deepEqual(ls.status, expected[ls.name], 'Status for ' + ls.name);
      });
      done(err);
    }));
  });
});