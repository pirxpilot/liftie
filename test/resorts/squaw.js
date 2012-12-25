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
        'Aerial Tram': 'closed',
        'Funitel': 'closed',
        'FirstVenture': 'open',
        'SnoVentures Carpet': 'open',
        'Tucker': 'open',
        'Exhibition': 'open',
        'Far East Express': 'open',
        'Red Dog': 'open',
        'Squaw Creek': 'open',
        'Squaw One Express': 'closed',
        'KT-22 Express': 'closed',
        'Olympic Lady': 'closed',
        'Cornice II': 'closed',
        'Murphy': 'open',
        'Boon': 'open',
        'Wylee': 'open',
        'Bailey\'s Beach': 'closed',
        'Belmont': 'closed',
        'The Pulley': 'closed',
        'Mountain Meadow': 'closed',
        'Emigrant': 'closed',
        'Gold Coast Express': 'closed',
        'Big Blue Express': 'closed',
        'Shirley Lake Express': 'closed',
        'Siberia Express': 'closed',
        'Solitude': 'closed',
        'Broken Arrow': 'closed',
        'Granite Chief': 'closed',
        'Headwall Express': 'closed',
        'Silverado': 'closed'
      };

      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});