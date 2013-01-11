var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/aspen-highlands').parse;

/*global describe, it */
describe('parse aspen-highlands', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/aspen-highlands.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Exhibition': 'open',
        'Thunderbowl': 'open',
        'Loge Peak': 'open',
        'Cloud Nine': 'open',
        'Deep Temerity': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});