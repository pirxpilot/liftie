var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('jay-peak');

/*global describe, it */
describe('parse jay-peak', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/jay-peak.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Aerial Tram': 'open',
        'Bonaventure Quad': 'open',
        'Flyer Quad': 'closed',
        'Jet Triple': 'open',
        'Metro Quad': 'open',
        'Stateside Carpet': 'open',
        'Taxi Quad': 'open',
        'Tramside Carpet': 'open',
        'Village Double': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});
