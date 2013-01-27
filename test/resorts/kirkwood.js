var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/kirkwood').parse;

/*global describe, it */
describe('parse kirkwood', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/kirkwood.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'SnowKirk': 'open',
        'Caples Crest': 'open',
        'Iron Horse': 'open',
        'Sunrise': 'open',
        'Solitude': 'open',
        'Cornice Express': 'open',
        'TC Express': 'open',
        'Slide Mountain': 'closed',
        'Bunny': 'open',
        'Wagon Wheel': 'open',
        'The Reut': 'open',
        'Vista': 'open',
        'Covered Wagon': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});