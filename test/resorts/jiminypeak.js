var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/jiminypeak');

/*global describe, it */
describe('parse jiminypeak', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/jiminypeak.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Alex\'s Park Carpet Lift': 'closed',
        'Triple Chair': 'closed',
        'Grand Slam': 'hold',
        'Novice Triple': 'open',
        'Berkshire Express': 'open',
        'Cricket Triple': 'open',
        'Q1 Quad': 'closed',
        'Carpet Lift': 'open',
        'Whites Quad': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});