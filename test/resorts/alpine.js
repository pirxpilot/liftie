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
        'Summit Express': 'scheduled',
        'Roundhouse': 'scheduled',
        'Hot Wheels': 'scheduled',
        'Scott': 'scheduled',
        'Lakeview': 'scheduled',
        'Yellow': 'scheduled',
        'Meadow': 'scheduled',
        'Subway': 'scheduled',
        'Kangaroo': 'scheduled',
        'Alpine Bowl Chair': 'scheduled',
        'Sherwood Express': 'scheduled',
        'Little Carpet': 'scheduled',
        'Big Carpet': 'scheduled'
      };
      should.exist(expected);
      status.should.eql(expected);
      done(err);
    }));
  });
});
