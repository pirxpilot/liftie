var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/pats-peak');

/*global describe, it */
describe('parse pats-peak', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/pats-peak.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        '1. Hurricane Triple Chair': 'closed',
        '2. Turbulence Triple Chair': 'closed',
        '3. Cascade Basin Triple Chair': 'closed',
        '4. Peak Double Chair': 'closed',
        '5. Vortex Double Chair': 'closed',
        '6. Valley Double Chair': 'closed',
        '7. Bluster Carpet': 'closed',
        '8. Gusty J-Bar': 'closed',
        '9. Beginner Tow I': 'closed',
        '10. Beginner Carpet': 'closed',
        '11. F5 Tow': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});