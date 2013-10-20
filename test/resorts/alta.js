var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/alta');

/*global describe, it */
describe('parse alta', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/alta.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        Albion: 'closed',
        Cecret: 'open',
        Collins: 'open',
        Sugarloaf: 'open',
        Sunnyside: 'open',
        Supreme: 'open',
        Wildcat: 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});