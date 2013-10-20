var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/mtrose');

/*global describe, it */
describe('parse mtrose', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/mtrose.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Northwest Magnum 6': 'scheduled',
        'Blazing Zephyr 6 ': 'scheduled',
        'Chuter': 'scheduled',
        'Lakeview': 'scheduled',
        'Galena': 'scheduled',
        'Ponderosa': 'scheduled',
        'Flying Jenny': 'scheduled'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});