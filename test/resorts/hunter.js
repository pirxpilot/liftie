var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/hunter');

/*global describe, it */
describe('parse hunter', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/hunter.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Kaatskill Flyer': 'open',
        'B-Lift': 'open',
        'C-Lift': 'open',
        'D-Lift': 'closed',
        'E-Lift': 'closed',
        'F-Lift': 'scheduled',
        'G-Lift': 'open',
        'H-Lift': 'closed',
        'Zephyr Express': 'open',
        'Pony Lift': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});