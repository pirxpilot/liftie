var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('snowbird');

/*global describe, it */
describe('parse snowbird', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/snowbird.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Aerial Tram': 'open',
        'Chickadee': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});
