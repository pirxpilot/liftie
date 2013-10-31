var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/attitash');

/*global describe, it */
describe('parse attitash', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/attitash.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Learning Center Triple': 'open',
        'Snowbelt': 'open',
        'Abenaki Quad': 'open',
        'Kachina Triple': 'open',
        'Flying Bear': 'open',
        'SnowTow': 'closed',
        'Top Notch Double': 'closed',
        'Flying Yankee': 'open',
        'Summit Triple': 'open',
        'East Double': 'open',
        'West Double': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});