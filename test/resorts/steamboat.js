var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/steamboat');

/*global describe, it */
describe('parse steamboat', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/steamboat.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Gondola': 'open',
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});
