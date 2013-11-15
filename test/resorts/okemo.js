var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/okemo');

/*global describe, it */
describe('parse okemo', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/okemo.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Solitude Express Quad': 'closed',
        'Morning Star Triple': 'closed',
        'Jackson Gore Express': 'closed',
        'Coleman Brook Exp. Quad': 'closed',
        'Stargazer Carpet': 'closed',
        'Orion\'s Belt Carpet': 'closed',
        'Green Ridge Triple': 'open',
        'F-10 Carpet': 'closed',
        'Starlight Carpet': 'closed',
        'The Pull': 'closed',
        'Black Ridge Triple': 'closed',
        'Northstar Express Quad': 'open',
        'Sachem Quad': 'closed',
        'Glades Peak Quad': 'closed',
        'South Face Express Quad': 'closed',
        'South Ridge Quad A': 'open',
        'South Ridge Quad B': 'closed',
        'Skywalker Carpet': 'closed',
        'Snow Stars Poma': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});