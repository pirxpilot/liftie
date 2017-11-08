var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('windham');

/*global describe, it */
describe('parse windham', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/windham.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Whirlwind High Speed Quad (A)': 'open',
        'Wheelchair Double Chairlift (B)': 'closed',
        'Wonderama Triple Chairlift (C)': 'open',
        'Whiteway Triple Chairlift (D)': 'open',
        'Wooly Bear Carpet (E)': 'open',
        'Whistler Triple Chairlift (F)': 'closed',
        'East Peak Express Quad (G)': 'open',
        'K Triple Chairlift': 'open',
        'Enclave Carpet': 'closed',
        'Park Tow': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});