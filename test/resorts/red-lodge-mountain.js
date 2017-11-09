var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('red-lodge-mountain');

/*global describe, it */
describe('parse red-lodge-mountain', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/red-lodge-mountain.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Magic Carpet': 'closed',
        'Miami Beach': 'closed',
        'Triple Chair': 'closed',
        'Grizzly Peak': 'closed',
        'Willow Creek': 'closed',
        'Cole Creek Quad': 'closed',
        'Palisades Quad': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});