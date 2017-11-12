var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('alpine');

/*global describe, it */
describe('parse alpine', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/alpine.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Summit Six': 'closed',
        'Roundhouse': 'closed',
        'Hot Wheels': 'closed',
        'Scott': 'closed',
        'Lakeview': 'closed',
        'Yellow': 'closed',
        'Meadow': 'closed',
        'Subway': 'closed',
        'Kangaroo': 'closed',
        'Alpine Bowl': 'closed',
        'Sherwood Express': 'closed',
        'Little Carpet': 'closed',
        'Big Carpet': 'closed',
        'Shuttle to Squaw Valley': 'closed'
      };
      should.exist(expected);
      status.should.eql(expected);
      done(err);
    }));
  });
});
