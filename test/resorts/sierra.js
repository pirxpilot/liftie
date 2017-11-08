var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('sierra');

/*global describe, it */
describe('parse sierra', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/sierra.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Easy Rider Express': 'open',
        'Easy Street Slider Carpet': 'open',
        'Easy Street Chill Carpet': 'closed',
        'Grandview Express': 'closed',
        'Nob Hill': 'open',
        'Rock Garden': 'open',
        'Tahoe King': 'closed',
        'Thunder Gulch Carpet': 'closed',
        'Tubing Hill Tow': 'open',
        'Wild Mountain Carpet': 'open',
        'El Dorado': 'closed',
        'Short Stuff': 'closed',
        'Puma': 'closed',
        'West Bowl Express': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});
