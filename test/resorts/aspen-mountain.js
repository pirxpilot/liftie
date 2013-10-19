var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/aspen-mountain');

/*global describe, it */
describe('parse aspen-mountain', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/aspen-mountain.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Gondola': 'open',
        'Bell Mountain': 'closed',
        'Ajax Express': 'open',
        'Gents': 'open',
        'Ruthies': 'open',
        'FIS': 'open',
        'Little Nell': 'closed',
        'Shadow Mountain': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});