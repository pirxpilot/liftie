var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parseAlpine = require('../../lib/resorts/alpine');

/*global describe, it */
describe('parse alpine', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/alpine.html');
    stream.on('error', done);
    stream.pipe(parser(parseAlpine, function(err, status) {
      var expected = {
        'Summit Six Chair': 'open',
        'Roundhouse Chair': 'open',
        'Hot Wheels': 'closed',
        'Sherwood Express Chair': 'closed',
        'Scott Chair': 'closed',
        'Lakeview Chair': 'closed',
        'Yellow Chair': 'closed',
        'Meadow Chair': 'open',
        'Subway Chair': 'closed',
        'Kangaroo Chair': 'closed',
        'Alpine Bowl Chair': 'closed',
        'Big Carpet': 'hold'
      };
      should.exist(expected);
      status.should.eql(expected);
      done(err);
    }));
  });
});