var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('okemo');

/*global describe, it */
describe('parse okemo', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/okemo.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Solitude Express Quad': 'open',
        'Morning Star Triple': 'closed',
        'Quantum Four': 'open',
        'Coleman Brook Express Quad': 'open',
        'Snow Star Carpet': 'closed',
        'Orion\'s Belt Carpet': 'closed',
        'Green Ridge Triple': 'closed',
        'F-10 Carpet': 'open',
        'Black Ridge Triple': 'closed',
        'Sunburst Six': 'open',
        'Sachem Quad': 'closed',
        'Glades Peak Quad': 'closed',
        'South Face Express Quad': 'closed',
        'South Ridge Quad A': 'closed',
        'South Ridge Quad B': 'open',
        'Sunshine Quad': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
