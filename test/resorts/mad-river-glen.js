var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/mad-river-glen');

/*global describe, it */
describe('parse mad-river-glen', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/mad-river-glen.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Single Chair': 'closed',
        'Sunnyside Double Chair': 'closed',
        'Birdland Double Chair': 'closed',
        'Practice Slope Chair': 'closed',
        'Callie\'s Corner Handle Tow': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});