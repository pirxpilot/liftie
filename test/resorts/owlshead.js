var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/owlshead');

/*global describe, it */
describe('parse owlshead', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/owlshead.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Main Quad': 'open',
        'Green Chair': 'closed',
        'Little Quad': 'open',
        'Little Red': 'closed',
        'Black Chair': 'open',
        'Lake Chair': 'open',
        'Blue Chair': 'open',
        'Panorama': 'closed',
        'Magic Carpet': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});