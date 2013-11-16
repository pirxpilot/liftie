var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/aspen-mountain');

/*global describe, it */
describe('parse aspen-mountain', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/aspen-mountain.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Ruthies': 'closed',
        'Shadow Mountain': 'closed',
        'Silver Queen Gondola': 'open',
        'Little Nell': 'closed',
        'Bell Mountain': 'closed',
        'F.I.S.': 'closed',
        'Ajax Express': 'open',
        'Gent\'s Ridge': 'open'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});