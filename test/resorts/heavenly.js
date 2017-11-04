var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parseHeavenly = require('../../lib/resorts/heavenly');

/*global describe, it */
describe('parse heavenly', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/heavenly.html');
    stream.on('error', done);
    stream.pipe(parser(parseHeavenly, function(err, status) {
      var expected = {
        'Aerial Tram': 'closed',
        'Bear Cave Carpet': 'closed',
        'Big Easy': 'closed',
        'Boulder': 'closed',
        'Boulder Carpet': 'closed',
        'Canyon': 'closed',
        'Comet': 'closed',
        'Dipper': 'closed',
        'DMZ Carpet': 'closed',
        'Enchanted Carpet': 'closed',
        'First Ride': 'closed',
        'Galaxy': 'closed',
        'Gondola': 'closed',
        'Groove': 'closed',
        'Gunbarrel': 'closed',
        'Mott': 'closed',
        'North Bowl': 'closed',
        'Olympic': 'closed',
        'Patsy\'s': 'closed',
        'Powderbowl': 'closed',
        'Sky': 'closed',
        'Stagecoach': 'closed',
        'Mitey Mite 1': 'closed',
        'Mitey Mite 2': 'closed',
        'Pioneer Mitey-Mite': 'closed',
        'Red Fir Mitey Mite': 'closed',
        'Tamarack': 'closed',
        'Tubing Lift': 'closed',
        'World Cup': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
