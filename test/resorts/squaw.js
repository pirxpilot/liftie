var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('squaw');

/*global describe, it */
describe('parse squaw', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/squaw.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Aerial Tram': 'closed',
        'Funitel': 'closed',
        'First Venture': 'closed',
        'SnoVentures Carpet': 'closed',
        'Tucker': 'closed',
        'Exhibition': 'closed',
        'Far East Express': 'closed',
        'Red Dog': 'closed',
        'Squaw Creek': 'closed',
        'Squaw One Express': 'closed',
        'KT22 Express': 'closed',
        'Olympic Lady': 'closed',
        'The Pulley': 'closed',
        'Murphy': 'closed',
        'Boon': 'closed',
        'Wylee': 'closed',
        'Bailey\'s Beach': 'closed',
        'Belmont': 'closed',
        'Mountain Meadow': 'closed',
        'Emigrant': 'closed',
        'Gold Coast Express': 'closed',
        'Big Blue Express': 'closed',
        'Shirley Express': 'closed',
        'Siberia Express': 'closed',
        'Solitude': 'closed',
        'Broken Arrow Lift': 'closed',
        'Granite Chief Lift': 'closed',
        'Headwall Express': 'closed',
        'Silverado': 'closed',
        'Shuttle to Alpine Meadows': 'closed',
        'Mini-snowmobile': 'closed',
        'Snow Tubing': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
