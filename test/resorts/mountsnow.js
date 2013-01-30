var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/mountsnow').parse;

/*global describe, it */
describe('parse mountsnow', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/mountsnow.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Covered Bridge': 'closed',
        'Sundance': 'closed',
        'Tumbleweed': 'open',
        'Canyon Express': 'open',
        'Grand Summit Express': 'open',
        'Ego Alley': 'closed',
        'Seasons': 'closed',
        'Bluebird Express': 'hold',
        'Voyager': 'closed',
        'Gemini': 'closed',
        'Apollo': 'open',
        'Discovery Shuttle': 'open',
        'Mercury': 'closed',
        'Ski Baba': 'closed',
        'Nitro Express': 'open',
        'Heavy Metal': 'closed',
        'Outpost': 'open',
        'Challenger': 'closed',
        'Beartrap': 'open',
        'Sunbrook': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});