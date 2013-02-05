var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parseSquaw = require('../../lib/resorts/squaw').parse;

/*global describe, it */
describe('parse squaw', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/squaw.html');
    stream.on('error', done);
    stream.pipe(parser(parseSquaw, function(err, status) {
      var expected = {
        'Aerial Tram': 'open',
        'Funitel': 'open',
        'FirstVenture': 'closed',
        'SnoVentures Carpet': 'open',
        'Tucker': 'closed',
        'Exhibition': 'closed',
        'Far East Express': 'open',
        'Red Dog': 'open',
        'Squaw Creek': 'open',
        'Squaw One Express': 'closed',
        'KT-22 Express': 'open',
        'Olympic Lady': 'closed',
        'Cornice II': 'closed',
        'Murphy': 'open',
        'Boon': 'closed',
        'Wylee': 'open',
        'Bailey\'s Beach': 'open',
        'Belmont': 'open',
        'The Pulley': 'open',
        'Mountain Meadow': 'open',
        'Emigrant': 'open',
        'Gold Coast Express': 'open',
        'Big Blue Express': 'open',
        'Shirley Lake Express': 'open',
        'Siberia Express': 'hold',
        'Solitude': 'closed',
        'Broken Arrow': 'closed',
        'Granite Chief': 'open',
        'Headwall Express': 'open',
        'Silverado': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});