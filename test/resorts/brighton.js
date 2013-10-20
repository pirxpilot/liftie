var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/brighton');

/*global describe, it */
describe('parse brighton', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/brighton.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Crest Express': 'open',
        'Explorer': 'open',
        'Great Western Express': 'open',
        'Milly Express': 'open',
        'Snake Creek Express': 'open',
        'Majestic Quad': 'open',
        'Terrain Park': 'open',
        'Half Pipe': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});