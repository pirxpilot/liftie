var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/tahoe-donner');

/*global describe, it */
describe('parse tahoe-donner', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/tahoe-donner.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Magic Carpet': 'closed',
        'Caterpillar Conveyor': 'closed',
        'Snowbird Chairlift': 'closed',
        'Eagle Rock Chairlift': 'closed',
        'Learning Center Conveyor': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
