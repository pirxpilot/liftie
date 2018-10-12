var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('stowe');

/*global describe, it */
describe('parse stowe', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/stowe.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Adventure Carpet': 'closed',
        'Adventure Triple': 'closed',
        'FourRunner Quad': 'open',
        'Gondola': 'hold',
        'Lookout Double': 'closed',
        'Meadows Carpet': 'closed',
        'Meadows Quad': 'closed',
        'Mountain Triple': 'closed',
        'Over Easy Gondola': 'closed',
        'Sensation Quad': 'closed',
        'Sunny Spruce Quad': 'closed',
        'Toll House Double': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});
