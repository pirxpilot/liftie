var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/devils-head');

/*global describe, it */
describe('parse devils-head', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/devils-head.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        '0': 'closed',
        '4': 'closed',
        'Wonder Carpet 400 feet': 'closed',
        'Wonder Carpet 300 feet': 'closed',
        '00': 'closed',
        '000': 'closed',
        'Quicksilver Express': 'closed',
        '3 ~ Glacial Express': 'closed',
        '3 1/4': 'closed',
        '3 1/2': 'closed',
        '4 1/4': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});