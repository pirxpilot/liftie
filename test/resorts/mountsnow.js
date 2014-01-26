var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/mountsnow');

/*global describe, it */
describe('parse mountsnow', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/mountsnow.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Covered Bridge': 'open',
        'Sundance': 'closed',
        'Tumbleweed': 'open',
        'Canyon Express': 'open',
        'Grand Summit Express': 'open',
        'Ego Alley': 'closed',
        'Seasons': 'open',
        'Bluebird Express': 'open',
        'Voyager': 'open',
        'Gemini': 'open',
        'Apollo': 'closed',
        'Discovery Shuttle': 'open',
        'Mercury': 'open',
        'Ski Baba': 'open',
        'Nitro Express': 'open',
        'Heavy Metal': 'open',
        'Outpost': 'open',
        'Challenger': 'hold',
        'Beartrap': 'open',
        'Sunbrook': 'open'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});