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
        'Lincoln Express': 'closed',
        'Judah Express': 'closed',
        'Disney Express': 'closed',
        'Summit Chair': 'closed',
        'Christmas Tree Express': 'closed',
        'Crow\'s Peak': 'closed',
        'Jerome Hill Express': 'closed',
        'Village Tow': 'closed',
        'White Pine (Beginner)': 'closed',
        'Flume Carpet': 'closed',
        'Nob Hill (Beginner)': 'closed',
        'Gondola': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});
