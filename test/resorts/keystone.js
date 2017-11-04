var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/keystone');

/*global describe, it */
describe('parse keystone', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/keystone.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'A51 Lift': 'closed',
        'Adventure Point Tubing Carpet': 'closed',
        'Argentine': 'closed',
        'DblBarrel Magic Carpet 2': 'closed',
        'DblBarrel Magic Carpet 4': 'closed',
        'Discovery Chairlift': 'closed',
        'Discovery Magic Carpet 3': 'closed',
        'Gondola Midway Magic Carpet': 'closed',
        'Kokomo Carpet': 'closed',
        'Montezuma Express': 'closed',
        'Outback Express': 'closed',
        'Outpost Gondola': 'closed',
        'Peru Express': 'closed',
        'Ranger': 'closed',
        'River Run Gondola': 'closed',
        'Ruby Express': 'closed',
        'Santiago Express': 'closed',
        'Summit Express': 'closed',
        'Sunkid Magic Carpet': 'closed',
        'Wayback': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});
