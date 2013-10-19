var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parseAlpine = require('../../lib/resorts/alpine');

/*global describe, it */
describe('parse alpine', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/alpine.html');
    stream.on('error', done);
    stream.pipe(parser(parseAlpine, function(err, status) {
      var expected = {
        'Summit Six Chair': 'scheduled',
        'Roundhouse Chair': 'scheduled',
        'Hot Wheels': 'scheduled',
        'Sherwood Express Chair': 'scheduled',
        'Scott Chair': 'scheduled',
        'Lakeview Chair': 'scheduled',
        'Yellow Chair': 'closed',
        'Meadow Chair': 'scheduled',
        'Subway Chair': 'scheduled',
        'Kangaroo Chair': 'closed',
        'Alpine Bowl Chair': 'closed',
        'Big Carpet': 'scheduled'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});