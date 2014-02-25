var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/big-sky');

/*global describe, it */
describe('parse big-sky', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/big-sky.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Cascade Triple': 'open',
        'Little Thunder': 'open',
        'Challenger Double': 'open',
        'Derringer Quad Chair': 'open',
        'Explorer Double': 'open',
        'Headwaters Double Chair': 'open',
        'Iron Horse Quad': 'open',
        'Lone Moose Triple': 'open',
        'Lone Peak Tram': 'open',
        'Dakota Lift Triple': 'open',
        'Lone Peak Triple': 'open',
        'Lone Tree Quad Chair': 'open',
        'Pony Express Triple': 'open',
        'Ramcharger': 'open',
        'Shedhorn Double': 'open',
        'Six Shooter Chair': 'open',
        'Southern Comfort': 'open',
        'Lewis and Clark': 'open',
        'Sacajawea': 'open',
        'Swift Current': 'open',
        'Thunder Wolf': 'open',
        'White Otter Double': 'open'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});