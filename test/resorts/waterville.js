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
        'High Country': 'closed',
        'Exhibition Poma': 'open',
        'Northside': 'closed',
        'Sunny Side': 'closed',
        'White Peaks Express': 'closed',
        'Valley Run Quad': 'open',
        'Lower Pasture Carpet': 'closed',
        'Upper Pasture Carpet': 'open',
        'World Cup T-Bar': 'open',
        'Lower Meadows': 'open',
        'Green Peak Triple': 'closed',
        'Kinderpark Lift': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});
