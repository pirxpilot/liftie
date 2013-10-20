var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/mthood');

/*global describe, it */
describe('parse mthood', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/mthood.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Ballroom Carpet': 'hold',
        'Buttercup': 'hold',
        'Daisy': 'hold',
        'Mt. Hood Express': 'hold',
        'Shooting Star Express': 'hold',
        'Hood River Express': 'hold',
        'Cascade Express': 'hold',
        'Heather Canyon': 'hold',
        'Easy Rider': 'hold',
        'Stadium Express': 'hold',
        'Blue': 'hold',
        'Vista Express': 'hold'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});