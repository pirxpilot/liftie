var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/wildcat').parse;

/*global describe, it */
describe('parse wildcat', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/wildcat.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Bobcat Triple': 'open',
        'Snowcat Triple': 'open',
        'Snowbelt': 'open',
        'Tomcat Triple': 'closed',
        'Wildcat Express Quad': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});