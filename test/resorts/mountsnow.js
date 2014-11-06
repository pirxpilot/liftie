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
        'Covered Bridge/Tubing': 'closed',
        'Sundance': 'closed',
        'Tumbleweed': 'closed',
        'Canyon Express': 'closed',
        'Grand Summit Express': 'closed',
        'Ego Alley': 'closed',
        'Seasons': 'closed',
        'Bluebird Express': 'closed',
        'Voyager': 'closed',
        'Gemini': 'closed',
        'Apollo': 'closed',
        'Discovery Shuttle': 'closed',
        'Mercury': 'closed',
        'Outpost': 'closed',
        'Challenger': 'closed',
        'Beartrap': 'closed',
        'Sunbrook': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});