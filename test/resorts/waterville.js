var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('waterville');

/*global describe, it */
describe('parse waterville', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/waterville.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'High Country Double': 'closed',
        'Exhibition Poma': 'closed',
        'Northside Double': 'closed',
        'Sunnyside Triple': 'closed',
        'White Peaks Quad': 'closed',
        'Valley Run Quad': 'closed',
        'Pasture J-Bar': 'closed',
        'World Cup T-Bar': 'closed',
        'Lower Meadows Double': 'closed',
        'Green Peak Triple': 'closed',
        'Kinderpark Carpet': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});
