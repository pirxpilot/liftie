var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/chinapeak');

/*global describe, it */
describe('parse chinapeak', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/chinapeak.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Chair 1': 'open',
        'Chair 2': 'open',
        'Chair 3': 'closed',
        'Chair 4': 'open',
        'Chair 5': 'open',
        'Chair 6': 'open',
        'Chair 7': 'open',
        'Kids Carpet': 'open',
        'Boulder Carpet': 'open',
        'Juniper Carpet': 'open',
        'Tubing Hill': 'closed',
        'Tbar': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});