var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/hochfuegen');

/*global describe, it */
describe('parse hochfuegen', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/hochfuegen.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Holzalm 6-seater chair lift': 'open',
        'Zillertal Shuttle': 'open',
        'Pfaffenbühel double chair lift': 'open',
        '8er-Jet Hochfügen': 'open',
        'Pfaffenbühel II tow': 'closed',
        'Achteralm tow': 'open',
        'Hochfügen 2000 quad chair lift': 'open',
        'Pfaffenbühel III tow': 'open',
        'Lamark I tow': 'open',
        'Lamark II tow': 'open',
        'Lamark III tow': 'open',
        'Lamark IV tow': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});