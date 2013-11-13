var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/alyeska');

/*global describe, it */
describe('parse alyeska', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/alyeska.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Aerial Tram': 'closed',
        'Ted\'s Express': 'closed',
        'Bear Cub Quad': 'closed',
        'Glacier Bowl Express': 'closed',
        'Chair 7': 'closed',
        'Wade\'s Way Magic Carpet': 'closed',
        'Finnland Magic Carpet': 'closed',
        'Tanaka': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});