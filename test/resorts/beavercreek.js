var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/beavercreek');

/*global describe, it */
describe('parse beavercreek', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/beavercreek.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Arrow Bahn Express': 'closed',
        'Bachelor Gulch Express': 'closed',
        'Bibber Bahn': 'closed',
        'Birds of Prey Express': 'closed',
        'Bridge Bahn': 'closed',
        'Buckaroo Express': 'closed',
        'Centennial Express': 'closed',
        'Cinch Express': 'closed',
        'Drink of Water': 'closed',
        'Elkhorn': 'closed',
        'Gold Bahn': 'closed',
        'Grouse Mountain Express': 'closed',
        'Highland Bahn': 'closed',
        'Highlands': 'closed',
        'Kerch Bahn': 'closed',
        'Larkspur': 'closed',
        'Lower Beaver Creek Mountain': 'closed',
        'Magic Carpet': 'closed',
        'Ritz Bahn': 'closed',
        'Riverfront Express Gondola': 'closed',
        'Rose Bowl': 'closed',
        'Silver Bahn': 'closed',
        'Strawberry Park Express': 'closed',
        'Upper Beaver Creek Mountain': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});