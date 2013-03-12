var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/winterplace').parse;

/*global describe, it */
describe('parse winterplace', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/winterplace.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        '#1 Double Chairlift': 'open',
        '#2 Triple Chairlift': 'closed',
        '#3 Triple Chairlift': 'open',
        '#4 Triple Chairlift': 'open',
        '#5 Double Chairlift': 'closed',
        '#6 Carpet Lift': 'open',
        '#7 Carpet Lift': 'closed',
        '#8 Quad Chairlift': 'closed',
        '#9 Quad Chairlift': 'closed',
        '#10 Tubing Carpet Lift': 'open',
        '#11 Tubing Carpet Lift': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});