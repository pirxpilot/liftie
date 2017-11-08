var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('mthigh');

/*global describe, it */
describe('parse mthigh', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/mthigh.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Blue Ridge Express': 'closed',
        'Conquest': 'closed',
        'Coyote': 'closed',
        'Exhibition': 'closed',
        'Moving Carpet West Long': 'closed',
        'Moving Carpet West Short': 'closed',
        'Roadrunner': 'closed',
        'Snowflake': 'closed',
        'Competition': 'closed',
        'Discovery': 'closed',
        'Easy Rider': 'closed',
        'Moving Carpet East': 'closed',
        'Mountain High Express': 'closed',
        'Sunrise Quad': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});
