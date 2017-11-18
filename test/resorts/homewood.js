var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('homewood');

/*global describe, it */
describe('parse homewood', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/homewood.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Madden Chair': 'closed',
        'Quail Chair': 'closed',
        'Ellis Chair': 'closed',
        'Old Homewood Express': 'closed',
        'Happy Platter': 'closed',
        'Alpine Platter': 'closed',
        'Magic Carpet': 'closed',
        'South Carpet': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});
