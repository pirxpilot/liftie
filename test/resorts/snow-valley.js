var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('snow-valley');

/*global describe, it */
describe('parse snow-valley', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/snow-valley.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        '(1) Double Chair': 'closed',
        '(2) Triple Chair': 'closed',
        '(3) Triple Chair': 'closed',
        '(4) Triple Chair': 'closed',
        '(6) Double Chair': 'closed',
        '(8) Double Chair': 'closed',
        '(9) Double Chair': 'closed',
        '(10) Double Chair': 'closed',
        '(11) Triple Chair': 'closed',
        '(12) Double Chair': 'closed',
        '(13) Triple Chair': 'closed',
        '(14) Conveyor': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
