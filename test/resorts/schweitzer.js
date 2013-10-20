var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/schweitzer');

/*global describe, it */
describe('parse schweitzer', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/schweitzer.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Basin Express Quad': 'open',
        'Great Escape Quad': 'open',
        'Idyle Our T-Bar': 'closed',
        'Lakeview Triple': 'open',
        'Musical Carpet': 'open',
        'Musical Chairs Double': 'open',
        'Snow Ghost Double': 'open',
        'Stella Express Six Pack': 'open',
        'Sunnyside Double': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});