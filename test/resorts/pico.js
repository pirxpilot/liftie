var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/pico');

/*global describe, it */
describe('parse pico', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/pico.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Bonanza Double': 'closed',
        'Bonanza Rope Tow': 'closed',
        'Golden Express Quad': 'closed',
        'Knomes Knoll Triple': 'closed',
        'Little Pico Triple': 'closed',
        'Outpost Double': 'closed',
        'Summit Express Quad': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
