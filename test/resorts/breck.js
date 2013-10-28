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
        'A Chair': 'open',
        'Beaver Run Superchair': 'open',
        'C Chair': 'open',
        'Camelback Platter': 'open',
        'Castle Carpet 1': 'open',
        'Castle Carpet 2': 'open',
        'Chair 5': 'open',
        'Chair 6': 'open',
        'Colorado Superchair': 'open',
        'E Chair': 'closed',
        'El Dorado Carpet C': 'open',
        'El Dorado Carpet D': 'open',
        'El Dorado Tow': 'closed',
        'Falcon Superchair': 'open',
        'Gondola': 'open',
        'Imperial Express SuperChair': 'closed',
        'Independence SuperChair': 'open',
        'Kids Carpet 3': 'open',
        'Kids Carpet 4': 'open',
        'Lehman Platter': 'open',
        'Mercury Superchair': 'open',
        'Peak 8 SuperConnect': 'open',
        'Quicksilver Super6': 'open',
        'Rip\'s Ride': 'open',
        'Rocky Mountain Superchair': 'open',
        'Snowflake': 'open',
        'T-Bar': 'open',
        'Trygve\'s Carpet': 'open',
        'Trygve\'s Platter': 'open',
        'Village Carpet A': 'open',
        'Village Carpet B': 'open',
        'Village Carpet C': 'open',
        'Village Carpet D': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});