var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('owlshead');

/*global describe, it */
describe('parse owlshead', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/owlshead.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Main': 'open',
        'Baby': 'open',
        'Black': 'open',
        'Lake': 'closed',
        'Blue': 'closed',
        'Magic carpet': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});
