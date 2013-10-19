var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/solitude');

/*global describe, it */
describe('parse solitude', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/solitude.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Apex Express': 'open',
        'Eagle Express': 'open',
        'Honeycomb': 'open',
        'Link': 'open',
        'Moonbeam Express': 'open',
        'Powderhorn': 'open',
        'Summit': 'open',
        'Sunrise': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});