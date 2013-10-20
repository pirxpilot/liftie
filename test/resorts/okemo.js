var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/okemo');

/*global describe, it */
describe('parse okemo', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/okemo.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Black Ridge Triple': 'open',
        'Coleman Brook Exp. Quad': 'open',
        'F-10 Carpet': 'open',
        'Glades Peak Quad': 'closed',
        'Green Ridge Triple': 'closed',
        'Jackson Gore Express': 'open',
        'Morning Star Triple': 'open',
        'Northstar Express Quad': 'open',
        'Orion\'s Belt Carpet': 'closed',
        'Sachem Quad': 'closed',
        'Skywalker Carpet': 'open',
        'Snow Stars Poma': 'open',
        'Solitude Express Quad': 'open',
        'South Face Express Quad': 'open',
        'South Ridge Quad A': 'open',
        'South Ridge Quad B': 'closed',
        'Stargazer Carpet': 'open',
        'Starlight Carpet': 'open',
        'The Pull': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});