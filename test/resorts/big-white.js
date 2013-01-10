var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/big-white').parse;

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
        'Gem Lake Express Quad': 'open',
        'Plaza Quad Chair': 'open',
        'Powder Triple Chair': 'open',
        'Falcon Double Chair': 'closed',
        'Cliff Chair': 'open',
        'Alpine T-bar': 'open',
        'Magic Carpet': 'open',
        'Kids Carpet': 'open',
        'Mega Snow Coaster Lift 1': 'open',
        'Mega Snow Coaster Lift 2': 'open',
        'Snow Ghost Express 6 Pack': 'open',
        'TELUS Park Chair': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});