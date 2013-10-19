var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/jackson-hole');

/*global describe, it */
describe('parse jackson-hole', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/jackson-hole.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Aerial Tram': 'closed',
        'Apres Vous High Speed Quad': 'closed',
        'Bridger Gondola': 'closed',
        'Casper Bowl High Speed Quad': 'closed',
        'Eagle\'s Rest Double Chair': 'closed',
        'Marmot Chair': 'closed',
        'Moose Creek Quad Chair': 'closed',
        'Sublette Quad Chair': 'closed',
        'Sweetwater Triple Chair': 'closed',
        'Teewinot High Speed Quad': 'closed',
        'Thunder Quad Chair': 'closed',
        'Union Pass Quad Chair': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});