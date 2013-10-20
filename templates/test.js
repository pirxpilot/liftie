var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/${ id }');

/*global describe, it */
describe('parse ${ id }', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/${ id }.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'lift 1': 'open',
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});