var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/sun-peaks');

/*global describe, it */
describe('parse sun-peaks', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/sun-peaks.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Sunburst Express Chairlift': 'closed',
        'Sundance Express Chairlift': 'closed',
        'Morrisey Express Chairlift': 'closed',
        'Burfield Chairlift': 'closed',
        'Crystal Chairlift': 'closed',
        'Elevation Chairlift': 'closed',
        'West Bowl T-Bar': 'closed',
        'Morrisey Platter Lift': 'closed',
        'Village Platter Lift': 'closed',
        'Village Carpet': 'closed',
        'Tube Time Carpet': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});