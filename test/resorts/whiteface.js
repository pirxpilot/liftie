var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/whiteface');

/*global describe, it */
describe('parse whiteface', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/whiteface.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Face Lift': 'open',
        'Bear Lift': 'open',
        'Mixing Bowl Lift': 'open',
        'Carpet Cruiser': 'open',
        'Bunny Hutch Triple Chair': 'open',
        'Lookout Mountain Triple Chair': 'closed',
        'Freeway Lift': 'closed',
        'Mountain Run Lift': 'closed',
        'Little Whiteface Lift': 'open',
        'Cloudsplitter Gondola': 'open',
        'Summit Quad Chair': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});