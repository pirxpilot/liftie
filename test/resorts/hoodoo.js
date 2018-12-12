var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('hoodoo');

/*global describe, it */
describe('parse hoodoo', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/hoodoo.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'MANZANITA': 'open',
        'EASY RIDER': 'open',
        'ED': 'open',
        'BIG GREEN MACHINE': 'closed',
        'HODAG': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
