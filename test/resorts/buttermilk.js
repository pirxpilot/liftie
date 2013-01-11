var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/buttermilk').parse;

/*global describe, it */
describe('parse buttermilk', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/buttermilk.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Summit Express': 'open',
        'Panda Peak': 'open',
        'Mitey Mite': 'open',
        'West Buttermilk Express': 'open',
        'Summit Handle-Tow': 'closed',
        'Tiehack Express': 'open',
        'Panda Carpet': 'open',
        'Mitey Carpet': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});