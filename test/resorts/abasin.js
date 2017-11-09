var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('abasin');

/*global describe, it */
describe('parse abasin', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/abasin.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Black Mountain Express': 'open',
        'Lenawee Mountain': 'open',
        'Pika Place Carpet': 'open',
        'Pallavicini': 'closed',
        'Zuma': 'closed',
        'Molly Hogan': 'closed',
        'Norway': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});