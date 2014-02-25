var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/boreal');

/*global describe, it */
describe('parse boreal', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/boreal.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Castle Peak Quad': 'open',
        'Accelerator Express Quad': 'open',
        'Nugget Chair': 'open',
        '49\'er Triple': 'closed',
        'Flying Dutchman Triple': 'open',
        'Cedar Ridge Triple': 'open',
        'Snowsports School Carpet': 'open'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});