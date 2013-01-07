var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/copper').parse;

/*global describe, it */
describe('parse copper', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/copper.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Alpine': 'closed',
        'American Eagle': 'open',
        'American Flyer': 'open',
        'Black Jack': 'closed',
        'Easy Rider': 'open',
        'Excelerator': 'open',
        'Gem': 'closed',
        'Kokomo': 'open',
        'Lumberjack': 'open',
        'Mountain Chief': 'closed',
        'Pitchfork': 'open',
        'Rendezvous': 'open',
        'Resolution': 'closed',
        'Rugrat': 'open',
        'Sierra': 'open',
        'Slingshot': 'open',
        'Stinger': 'open',
        'Storm King': 'open',
        'Super Bee': 'open',
        'The Glide': 'open',
        'Timberline Express': 'open',
        'Tucker Cat': 'closed',
        'Union Creek High Speed Quad': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});