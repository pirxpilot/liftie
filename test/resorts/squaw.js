var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parseSquaw = require('../../lib/resorts/squaw');

/*global describe, it */
describe('parse squaw', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/squaw.html');
    stream.on('error', done);
    stream.pipe(parser(parseSquaw, function(err, status) {
      var expected = {
        'Tram': 'closed',
        'Gold Coast Funitel': 'closed',
        'First Venture': 'closed',
        'SnoVentures Carpet': 'closed',
        'Tucker': 'closed',
        'Exhibition': 'closed',
        'Far East Express': 'closed',
        'Red Dog': 'closed',
        'Squaw Creek': 'closed',
        'Squaw One Express': 'closed',
        'KT-22 Express': 'closed',
        'Olympic Lady': 'closed',
        'Cornice II': 'closed',
        'Murphy': 'closed',
        'Boon': 'closed',
        'Wylee': 'closed',
        'Bailey\'s Beach': 'closed',
        'Belmont': 'closed',
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
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});