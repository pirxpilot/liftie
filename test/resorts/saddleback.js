var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/saddleback');

/*global describe, it */
describe('parse saddleback', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/saddleback.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Rangeley Double': 'closed',
        'South Branch Quad': 'closed',
        'Kennebago Quad': 'closed',
        'Sandy Double': 'closed',
        'Cupsuptic T-Bar': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});