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
        'East Basin Chair': 'closed',
        'Gondola - Express': 'closed',
        'Little Sister Chair': 'closed',
        'Seven Brothers Chair': 'closed',
        'North Peak Express Quad': 'closed',
        'Lincoln Express Quad': 'closed',
        'Tote Road Quad': 'closed',
        'Children Center Carpet Lift': 'closed',
        'Kancamagus Express Quad': 'closed',
        'Kissin\' Cousin Chair': 'closed',
        'Sarsaparilla Carpet Lift': 'closed',
        'Sarsaparilla Handle Tow': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});