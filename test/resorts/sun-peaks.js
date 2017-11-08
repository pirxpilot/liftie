var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('sun-peaks');

/*global describe, it */
describe('parse sun-peaks', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/sun-peaks.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Sunburst Express Chairlift': 'open',
        'Sundance Express Chairlift': 'open',
        'Morrisey Express Chairlift': 'open',
        'Learning Zone Carpet': 'open',
        'Burfield Chairlift': 'open',
        'Crystal Chairlift': 'open',
        'Elevation Chairlift': 'open',
        'West Bowl T-Bar': 'closed',
        'Morrisey Platter': 'open',
        'Village Platter': 'open',
        'Village Carpet': 'open',
        'Tube Time Carpet': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
