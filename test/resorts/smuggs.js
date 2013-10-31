var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/smuggs');

/*global describe, it */
describe('parse smuggs', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/smuggs.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Mogul Mouse\'s Magic': 'open',
        'Morse Highlands': 'open',
        'Sir Henry\'s Hill': 'open',
        'Village': 'open',
        'Sterling Summit': 'open',
        'Sterling T-Bar': 'closed',
        'Madonna I Summit': 'open',
        'Madonna II': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});