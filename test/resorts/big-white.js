var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/big-white');

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
        'Gem Lake Express Quad': 'closed',
        'Plaza Quad Chair': 'open',
        'Powder Triple Chair': 'closed',
        'Falcon Double Chair': 'closed',
        'Cliff Chair': 'closed',
        'Alpine T-bar': 'closed',
        'Magic Carpet': 'open',
        'Kids Carpet': 'open',
        'Mega Snow Coaster Lift 1': 'closed',
        'Mega Snow Coaster Lift 2': 'closed',
        'Snow Ghost Express 6 Pack': 'closed',
        'TELUS Park Chair': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});