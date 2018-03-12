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
        'Morning Star Triple': 'open',
        'Quantum Four': 'open',
        'Coleman Brook Express Quad': 'open',
        'Stargazer Carpet': 'open',
        'Orion\'s Belt Carpet': 'closed',
        'Green Ridge Triple': 'open',
        'F-10 Carpet': 'open',
        'Starlight Carpet': 'closed',
        'The Pull': 'closed',
        'Black Ridge Triple': 'closed',
        'Sunburst Six': 'open',
        'Sachem Quad': 'open',
        'Glades Peak Quad': 'closed',
        'South Face Express Quad': 'open',
        'South Ridge Quad A': 'open',
        'South Ridge Quad B': 'closed',
        'Skywalker Carpet': 'closed',
        'Snow Star Carpet': 'closed',
        'Sunshine Quad': 'open'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
