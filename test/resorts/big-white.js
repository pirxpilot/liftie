var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('big-white');

/*global describe, it */
describe('parse big-white', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/big-white.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Lara’s Gondola': 'open',
        'Ridge Rocket Express Quad': 'open',
        'Bullet Express Quad': 'open',
        'Black Forest Express Quad': 'open',
        'Gem Lake Express Quad': 'scheduled',
        'Plaza Quad Chair': 'open',
        'Powder Triple Chair': 'open',
        'Falcon Double Chair': 'scheduled',
        'Cliff Chair': 'open',
        'Alpine T-bar': 'open',
        'Magic Carpet': 'open',
        'Kids Carpet': 'open',
        'Snow Ghost Express 6 Pack': 'scheduled',
        'TELUS Park Chair': 'open',
        'Tube Park Lift': "open"
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
