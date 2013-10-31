var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/loveland');

/*global describe, it */
describe('parse loveland', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/loveland.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Chair 2': 'open',
        'Chair 9': 'closed',
        'Chair 8': 'closed',
        'Chair 7': 'open',
        'Chair 6': 'open',
        'Chair 4': 'open',
        'Chair 3': 'open',
        'Chair 1': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});