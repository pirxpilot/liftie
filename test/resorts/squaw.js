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
        'Aerial Tram': 'scheduled',
        'Funitel': 'scheduled',
        'FirstVenture': 'closed',
        'SnoVentures Carpet': 'scheduled',
        'Tucker': 'closed',
        'Exhibition': 'closed',
        'Far East Express': 'scheduled',
        'Red Dog': 'scheduled',
        'Squaw Creek': 'scheduled',
        'Squaw One Express': 'closed',
        'KT-22 Express': 'scheduled',
        'Olympic Lady': 'closed',
        'Cornice II': 'closed',
        'Murphy': 'scheduled',
        'Boon': 'closed',
        'Wylee': 'scheduled',
        'Bailey\'s Beach': 'scheduled',
        'Belmont': 'scheduled',
        'The Pulley': 'scheduled',
        'Mountain Meadow': 'scheduled',
        'Emigrant': 'scheduled',
        'Gold Coast Express': 'scheduled',
        'Big Blue Express': 'scheduled',
        'Shirley Lake Express': 'scheduled',
        'Siberia Express': 'scheduled',
        'Solitude': 'closed',
        'Broken Arrow': 'closed',
        'Granite Chief': 'scheduled',
        'Headwall Express': 'scheduled',
        'Silverado': 'closed'
      };

      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});