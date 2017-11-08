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
        'Bachelor Gulch Express': 'closed',
        'Bibber Bahn': 'closed',
        'Birds of Prey Express': 'closed',
        'Buckaroo Express Gondola': 'closed',
        'Centennial Express': 'closed',
        'Cinch Express': 'closed',
        'Elkhorn Lift': 'closed',
        'Gold Bahn': 'closed',
        'Grouse Mountain Express': 'closed',
        'Highlands Lift': 'closed',
        'Kerch Bahn': 'closed',
        'Larkspur Express': 'closed',
        'Lower Beaver Creek Mountain Express': 'closed',
        'Magic Carpet': 'closed',
        'Red Buffalo Express': 'closed',
        'Ritz Bahn': 'closed',
        'Riverfront Express Gondola': 'closed',
        'Rose Bowl Express': 'closed',
        'Silver Bahn': 'closed',
        'Strawberry Park Express': 'closed',
        'Upper Beaver Creek Mountain Express': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
