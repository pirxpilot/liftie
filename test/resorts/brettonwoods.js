var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/brettonwoods');

/*global describe, it */
describe('parse brettonwoods', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/brettonwoods.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'B-Lift Double': 'closed',
        'Rosebrook Summit Express': 'open',
        'Bethlehem Express': 'open',
        'Telegraph T-Bar': 'closed',
        'Fabyan\'s Express Triple': 'open',
        'West Mountain Express': 'open',
        'Learning Center Quad': 'open',
        'Wonder Carpet': 'open',
        'Red Carpet': 'open',
        'Zephyr': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});