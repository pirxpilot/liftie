var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/bolton-valley');

/*global describe, it */
describe('parse bolton-valley', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/bolton-valley.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Vista Quad': 'closed',
        'Mighty Mite Lift': 'closed',
        'Mid-Mountain Chair': 'closed',
        'Snowflake Chair': 'closed',
        'Timberline Quad': 'closed',
        'Wilderness Chair': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});