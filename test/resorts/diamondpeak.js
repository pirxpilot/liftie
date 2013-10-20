var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/diamondpeak');

/*global describe, it */
describe('parse diamondpeak', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/diamondpeak.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Crystal Express': 'open',
        'Lakeview': 'open',
        'Lodgepole': 'open',
        'Red Fox': 'closed',
        'Ridge': 'closed',
        'Schoolhouse': 'open',
        'Surface Lift': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});