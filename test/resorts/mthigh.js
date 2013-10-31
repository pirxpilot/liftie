var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/mthigh');

/*global describe, it */
describe('parse mthigh', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/mthigh.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Blue Ridge Express': 'open',
        'Conquest': 'closed',
        'Coyote': 'open',
        'Exhibition': 'closed',
        'Moving Carpet West Long': 'open',
        'Moving Carpet West Short': 'open',
        'Roadrunner': 'closed',
        'Snowflake': 'open',
        'Competition': 'closed',
        'Discovery': 'closed',
        'Easy Rider': 'closed',
        'Moving Carpet East': 'closed',
        'Mtn High Express': 'closed',
        'Sunrise Quad': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});