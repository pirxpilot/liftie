var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/stowe');

/*global describe, it */
describe('parse stowe', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/stowe.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Adventure Center Carpet': 'closed',
        'Adventure Triple': 'closed',
        'FourRunner Quad': 'closed',
        'Gondola': 'closed',
        'Lookout Double': 'closed',
        'Meadows Carpet': 'closed',
        'Meadows Quad': 'closed',
        'Mountain Triple': 'closed',
        'Over Easy Transfer Gondola': 'closed',
        'Sensation Quad': 'closed',
        'Sunny Spruce Quad': 'closed',
        'Toll House Double': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});
