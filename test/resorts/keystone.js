var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/keystone');

/*global describe, it */
describe('parse keystone', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/keystone.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'A51 Lift': 'open',
        'Adventure Point Tubing Carpet': 'open',
        'Argentine': 'open',
        'DblBarrel Magic Carpet 2': 'open',
        'DblBarrel Magic Carpet 4': 'open',
        'Discovery Chairlift': 'open',
        'Discovery Magic Carpet 3': 'open',
        'Gondola Midway Magic Carpet': 'open',
        'Kokomo Carpet': 'open',
        'Montezuma Express': 'open',
        'Outback Express': 'open',
        'Outpost Gondola': 'open',
        'Peru Express': 'open',
        'Ranger': 'open',
        'River Run Gondola': 'open',
        'Ruby Express': 'open',
        'Santiago Express': 'open',
        'Summit Express': 'open',
        'Sunkid Magic Carpet': 'open',
        'Wayback': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});