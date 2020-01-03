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
        'Brooks Express': 'closed',
        'Daisy': 'closed',
        'Double Diamond': 'closed',
        'Flow Zone Large Carpet': 'closed',
        'Flow Zone Medium Carpet': 'closed',
        'Flow Zone Small Carpet': 'closed',
        'Hogsback Express': 'closed',
        'Kehr\'s': 'closed',
        'Seventh Heaven': 'closed',
        'Skyline Express': 'closed',
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
