var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/alta');

/*global describe, it */
describe('parse alta', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/alta.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        Albion: 'closed',
        Cecret: 'closed',
        Collins: 'open',
        Sugarloaf: 'closed',
        Sunnyside: 'open',
        Supreme: 'closed',
        Wildcat: 'open'
      };
      status.should.eql(expected);
      done(err);
    }));
  });
});