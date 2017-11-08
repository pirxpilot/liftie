var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('stevens');

/*global describe, it */
describe('parse stevens', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/stevens.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        '7th Heaven': 'closed',
        'Brooks': 'closed',
        'Daisy': 'closed',
        'Double Diamond': 'closed',
        'Hogsback Express': 'closed',
        'Kehr\'s Chair': 'closed',
        'SkyLine Express': 'closed',
        'Tye Mill': 'closed',
        'Jupiter Express': 'closed',
        'Southern Cross': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});