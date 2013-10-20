var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/sugarloaf');

/*global describe, it */
describe('parse sugarloaf', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/sugarloaf.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'SuperQuad': 'closed',
        'Whiffletree SuperQuad': 'closed',
        'Skyline': 'closed',
        'King Pine': 'closed',
        'Timberline': 'closed',
        'Bucksaw': 'closed',
        'Skidway': 'closed',
        'Double Runner East': 'closed',
        'Double Runner West': 'closed',
        'Sawduster': 'closed',
        'West Mountain': 'closed',
        'Snubber': 'closed',
        '#3 T-Bar/Bateau': 'closed',
        'Moose-calator': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});