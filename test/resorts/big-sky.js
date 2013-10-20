var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/big-sky');

/*global describe, it */
describe('parse big-sky', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/big-sky.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Cascade Triple': 'closed',
        'Little Thunder': 'closed',
        'Challenger Double': 'closed',
        'Explorer Double': 'closed',
        'Bear Back': 'closed',
        'Iron Horse Quad': 'closed',
        'Lone Moose Triple': 'closed',
        'Lone Peak Tram': 'closed',
        'Dakota Lift Triple': 'closed',
        'Lone Peak Triple': 'closed',
        'Pony Express Triple': 'closed',
        'Ramcharger': 'closed',
        'Shedhorn Double': 'closed',
        'Southern Comfort': 'closed',
        'Swift Current': 'closed',
        'Thunder Wolf': 'closed',
        'White Otter Double': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});