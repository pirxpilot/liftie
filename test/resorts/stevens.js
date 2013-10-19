var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/stevens');

/*global describe, it */
describe('parse stevens', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/stevens.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'SkyLine Quad': 'open',
        'Hogsback Quad': 'open',
        'Daisy': 'open',
        'Tye Mill': 'open',
        'Brooks': 'open',
        'Kehr\'s Chair': 'open',
        '7th Heaven': 'open',
        'Double Diamond': 'open',
        'Jupiter Quad': 'open',
        'Southern Cross': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});