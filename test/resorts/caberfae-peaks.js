var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('caberfae-peaks');

/*global describe, it */
describe('parse caberfae-peaks', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/caberfae-peaks.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Vista 1561\' Triple Chairlift': 'open',
        'Shelter Double Chairlift': 'open',
        'North Peak Quad Chairlift': 'closed',
        'South Peak Triple Chairlift': 'open',
        'Taxi Surface Lift': 'open'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
