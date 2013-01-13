var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/mtbachelor').parse;

/*global describe, it */
describe('parse mtbachelor', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/mtbachelor.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Pine Marten Express': 'scheduled',
        'Skyliner Express': 'scheduled',
        'Sunrise Express': 'scheduled',
        'Sunshine Accelerator': 'scheduled',
        'Carrousel': 'scheduled',
        'Rainbow Chair': 'scheduled',
        'Red Chair': 'closed',
        'Northwest Express': 'scheduled',
        'Outback Express': 'scheduled',
        'Summit Express': 'scheduled',
        'Snowblast Tow': 'scheduled'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});