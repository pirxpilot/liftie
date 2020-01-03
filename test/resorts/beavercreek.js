var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('beavercreek');

/*global describe, it */
describe('parse beavercreek', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/beavercreek.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Arrow Bahn': 'closed',
        'Bachelor Gulch Express': 'open',
        'Bibber Lift': 'open',
        'Birds of Prey Express': 'closed',
        'Centennial Express': 'open',
        'Cinch Express': 'open',
        'Elkhorn Lift': 'closed',
        'Grouse Mountain Express': 'closed',
        'Haymeadow Express Gondola': 'open',
        'Highlands Lift': 'closed',
        'Jitterbug Lift': 'closed',
        'Larkspur Express': 'closed',
        'Lower Beaver Creek Mountain Express': 'closed',
        'Magic Lift': 'open',
        'Red Buffalo Express': 'open',
        'RitzBahn Lift': 'closed',
        'Riverfront Express Gondola': 'open',
        'Rose Bowl Express': 'open',
        'Snowflake Lift': 'closed',
        'Strawberry Park Express': 'open',
        'Train Rider Lift': 'open',
        'Upper Beaver Creek Mountain Express': 'closed',
        'Wagon Train Lift': 'open'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
