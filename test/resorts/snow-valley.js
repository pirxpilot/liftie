var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/snow-valley');

/*global describe, it */
describe('parse snow-valley', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/snow-valley.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        '(1) Double Chair': 'open',
        '(2) Triple Chair': 'closed',
        '(3) Triple Chair': 'open',
        '(4) Triple Chair': 'closed',
        '(6) Double Chair': 'open',
        '(8) Double Chair': 'closed',
        '(9) Double Chair': 'closed',
        '(10) Double Chair': 'closed',
        '(11) Triple Chair': 'closed',
        '(12) Double Chair': 'open',
        '(13) Triple Chair': 'open',
        '(14) Conveyor': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});