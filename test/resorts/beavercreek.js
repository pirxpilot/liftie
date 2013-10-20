var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/beavercreek');

/*global describe, it */
describe('parse beavercreek', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/beavercreek.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Arrow Bahn Express': 'open',
        'Bachelor Gulch Express': 'open',
        'Bibber Bahn': 'open',
        'Birds of Prey Express': 'open',
        'Bridge Bahn': 'open',
        'Buckaroo Express': 'open',
        'Centennial Express': 'open',
        'Cinch Express': 'open',
        'Drink of Water': 'open',
        'Elkhorn': 'open',
        'Gold Bahn': 'open',
        'Grouse Mountain Express': 'open',
        'Highland Bahn': 'open',
        'Highlands': 'open',
        'Kerch Bahn': 'open',
        'Larkspur': 'open',
        'Lower Beaver Creek Mountain': 'open',
        'Magic Carpet': 'open',
        'Ritz Bahn': 'open',
        'Riverfront Express Gondola': 'open',
        'Rose Bowl': 'open',
        'Silver Bahn': 'open',
        'Strawberry Park Express': 'open',
        'Upper Beaver Creek Mountain': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});