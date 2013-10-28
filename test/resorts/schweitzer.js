var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/schweitzer');

/*global describe, it */
describe('parse schweitzer', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/schweitzer.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Basin Express Quad': 'closed',
        'Great Escape Quad': 'closed',
        'Idyle Our T-Bar': 'open',
        'Lakeview Triple': 'closed',
        'Musical Carpet': 'closed',
        'Musical Chairs Double': 'closed',
        'Snow Ghost Double': 'closed',
        'Stella Express Six Pack': 'closed',
        'Sunnyside Double': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});