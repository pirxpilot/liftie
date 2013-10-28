var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/sierra');

/*global describe, it */
describe('parse sierra', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/sierra.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Easy Rider Express': 'open',
        'Easy Street Chill Carpet': 'open',
        'Easy Street Slider Carpet': 'open',
        'Grandview Express': 'open',
        'Nob Hill': 'open',
        'Rock Garden': 'open',
        'Tahoe King': 'open',
        'Thunder Gulch Carpet': 'open',
        'Tubing Hill Tow': 'open',
        'Wild Mountain Carpet': 'open',
        'El Dorado': 'open',
        'Short Stuff': 'open',
        'Puma': 'open',
        'West Bowl Express': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});