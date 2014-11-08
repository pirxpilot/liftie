var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/snowbasin');

/*global describe, it */
describe('parse snowbasin', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/snowbasin.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Strawberry Express': 'closed',
        'Becker': 'closed',
        'Little Cat Express': 'closed',
        'Middle Bowl Triple': 'closed',
        'Needles Express': 'closed',
        'Wild Cat': 'closed',
        'Porcupine': 'closed',
        'John Paul Express': 'closed',
        'Mt. Allen Tram': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});