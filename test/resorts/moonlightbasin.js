var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/moonlightbasin').parse;

/*global describe, it */
describe('parse moonlightbasin', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/moonlightbasin.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Pony Express': 'open',
        'Iron Horse': 'open',
        'Derringer': 'open',
        'Six Shooter': 'open',
        'Lone Tree Quad': 'open',
        'Headwaters': 'open',
        'Magic Carpet': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});