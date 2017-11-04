var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/breck');

/*global describe, it */
describe('parse breck', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/breck.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'A Chair': 'closed',
        'Beaver Run Superchair': 'closed',
        'C Chair': 'closed',
        'Camelback Platter': 'closed',
        'Castle Carpet 1': 'closed',
        'Castle Carpet 2': 'closed',
        'Chair 5': 'closed',
        'Chair 6': 'closed',
        'Colorado Superchair': 'closed',
        'E Chair': 'closed',
        'El Dorado Carpet C': 'closed',
        'El Dorado Carpet D': 'closed',
        'El Dorado Tow': 'closed',
        'Falcon Superchair': 'closed',
        'Gondola': 'closed',
        'Imperial Express SuperChair': 'closed',
        'Independence SuperChair': 'closed',
        'Kensho Superchair': 'closed',
        'Kids Carpet 3': 'closed',
        'Kids Carpet 4': 'closed',
        'Mercury Superchair': 'closed',
        'Peak 8 SuperConnect': 'closed',
        'Quicksilver Super6': 'closed',
        'Rip\'s Ride': 'closed',
        'Rocky Mountain Superchair': 'closed',
        'Snowflake': 'closed',
        'T-Bar': 'closed',
        'Trygve\'s Carpet': 'closed',
        'Trygve\'s Platter': 'closed',
        'Village Carpet A': 'closed',
        'Village Carpet B': 'closed',
        'Village Carpet C': 'closed',
        'Village Carpet D': 'closed',
        'Zendo Chair': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});
