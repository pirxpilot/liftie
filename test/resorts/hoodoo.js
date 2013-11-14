var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/hoodoo');

/*global describe, it */
describe('parse hoodoo', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/hoodoo.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Manzanita': 'closed',
        'Easy Rider': 'open',
        'Ed': 'hold',
        'Big Green Machine': 'open',
        'Hodag': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});