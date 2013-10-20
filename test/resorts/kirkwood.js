var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/kirkwood');

/*global describe, it */
describe('parse kirkwood', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/kirkwood.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'SnowKirk': 'scheduled',
        'Caples Crest': 'scheduled',
        'Iron Horse': 'scheduled',
        'Sunrise': 'scheduled',
        'Solitude': 'scheduled',
        'Cornice Express': 'scheduled',
        'TC Express': 'scheduled',
        'Bunny': 'scheduled',
        'Wagon Wheel': 'scheduled',
        'The Reut': 'scheduled',
        'Vista': 'scheduled',
        'Covered Wagon': 'scheduled'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});