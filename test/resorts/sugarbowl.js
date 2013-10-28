var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/sugarbowl');

/*global describe, it */
describe('parse sugarbowl', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/sugarbowl.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Lincoln Express': 'open',
        'Judah Express': 'open',
        'Disney Express': 'open',
        'Summit Chair': 'closed',
        'Christmas Tree Express': 'open',
        'Crow\'s Nest': 'closed',
        'Jerome Hill Express': 'open',
        'Meadow': 'closed',
        'White Pine': 'open',
        'The Flume': 'open',
        'Nob Hill': 'open',
        'Gondola': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});