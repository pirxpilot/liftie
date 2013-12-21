var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/jiminypeak');

/*global describe, it */
describe('parse jiminypeak', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/jiminypeak.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Alex\'s Park Carpet Lift': 'closed',
        'Triple Chair': 'closed',
        'Grand Slam': 'closed',
        'Novice Triple': 'open',
        'Berkshire Express': 'open',
        'Cricket Triple': 'open',
        'Q1 Quad': 'closed',
        'Carpet Lift': 'open',
        'Whites Quad': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});