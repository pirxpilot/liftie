var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/mtbachelor');

/*global describe, it */
describe('parse mtbachelor', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/mtbachelor.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Pine Marten Express': 'open',
        'Skyliner Express': 'open',
        'Sunrise Express': 'open',
        'Sunshine Accelerator': 'open',
        'Carrousel Chair': 'closed',
        'Rainbow Chair': 'open',
        'Red Chair': 'closed',
        'Northwest Express': 'open',
        'Outback Express': 'open',
        'Summit Express': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});