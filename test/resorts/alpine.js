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
        'Summit Express': 'closed',
        'Roundhouse': 'closed',
        'Scott': 'closed',
        'Lakeview': 'closed',
        'Yellow': 'closed',
        'Meadow': 'closed',
        'Subway': 'closed',
        'Kangaroo': 'closed',
        'Alpine Bowl Chair': 'closed',
        'Sherwood Express': 'closed',
        'Treeline Cirque': 'closed',
        'Big Carpet': 'closed'
      };
      should.exist(expected);
      status.should.eql(expected);
      done(err);
    }));
  });
});
