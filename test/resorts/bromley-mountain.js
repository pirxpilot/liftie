var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('bromley-mountain');

/*global describe, it */
describe('parse bromley-mountain', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/bromley-mountain.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
       '#1 Sun Mountain Express': 'closed',
       '#2 Plaza Chairlift': 'closed',
       '#4 Sun Chairlift': 'closed',
       '#5 Alpine Chairlift': 'closed',
       '#6 East Meadow Chairlift': 'closed',
       '#7 Star Carpet': 'closed',
       '#8 Lord\'s Prayer T-Bar': 'closed',
       '#10 Blue Ribbon Quad': 'closed',
       '#11 Kids Carpet': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
