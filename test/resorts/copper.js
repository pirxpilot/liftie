var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/copper');

/*global describe, it */
describe('parse copper', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/copper.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Alpine': 'closed',
        'American Eagle': 'closed',
        'American Flyer': 'closed',
        'Black Jack': 'closed',
        'Celebrity Ridge': 'closed',
        'Easy Rider': 'closed',
        'Excelerator': 'closed',
        'Gem': 'closed',
        'Kokomo': 'closed',
        'Lumberjack': 'closed',
        'Mountain Chief': 'closed',
        'Pitchfork': 'closed',
        'Rendezvous': 'closed',
        'Resolution': 'closed',
        'Rugrat': 'closed',
        'Sierra': 'closed',
        'Slingshot': 'closed',
        'Stinger': 'closed',
        'Storm King': 'closed',
        'Super Bee': 'closed',
        'The Glide': 'closed',
        'Timberline Express': 'closed',
        'Tucker Cat': 'closed',
        'Union Creek High Speed Quad': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});