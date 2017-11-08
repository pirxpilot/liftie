var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('devils-head');

/*global describe, it */
describe('parse devils-head', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/devils-head.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Sunkid (Short)': 'closed',
        'Sunkid (Long)': 'closed',
        '0': 'closed',
        '00': 'closed',
        '000': 'closed',
        '1 Quicksilver Express': 'closed',
        '3 Glacial Express': 'closed',
        '3¼': 'closed',
        '3½': 'closed',
        '4': 'closed',
        '4¼': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});