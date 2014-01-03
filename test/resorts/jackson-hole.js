var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/jackson-hole');

/*global describe, it */
describe('parse jackson-hole', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/jackson-hole.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Aerial Tram': 'open',
        'Apres Vous High Speed Quad': 'open',
        'Bridger Gondola': 'open',
        'Casper Bowl High Speed Quad': 'open',
        'Eagle\'s Rest Double Chair': 'open',
        'Marmot Chair': 'open',
        'Moose Creek Quad Chair': 'open',
        'Sublette Quad Chair': 'closed',
        'Sweetwater Triple Chair': 'open',
        'Teewinot High Speed Quad': 'open',
        'Thunder Quad Chair': 'open',
        'Union Pass Quad Chair': 'open'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});