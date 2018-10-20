var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('loon');

/*global describe, it */
describe('parse loon', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/loon.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'East Basin Double': 'closed',
        'Gondola': 'closed',
        'Little Sister Double': 'closed',
        'Seven Brothers Triple': 'closed',
        'Lincoln Express Quad': 'closed',
        'Tote Road Connector': 'closed',
        'Kancamagus Express Quad': 'closed',
        'Kissin\' Cousin Double': 'closed',
        'Sarsaparilla Carpet': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
