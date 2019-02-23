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
        'Aerial Tram': 'scheduled',
        'Funitel': 'scheduled',
        'First Venture': 'scheduled',
        'SnoVentures Carpet': 'scheduled',
        'Tucker': 'scheduled',
        'Exhibition': 'scheduled',
        'Far East Express': 'scheduled',
        'Red Dog': 'scheduled',
        'Squaw Creek': 'scheduled',
        'Squaw One Express': 'scheduled',
        'KT22 Express': 'scheduled',
        'Olympic Lady': 'closed',
        'The Pulley': 'closed',
        'Murphy': 'scheduled',
        'Boon': 'scheduled',
        'Wylee': 'scheduled',
        'Bailey\'s Beach': 'scheduled',
        'Belmont': 'scheduled',
        'Mountain Meadow': 'scheduled',
        'Emigrant': 'scheduled',
        'Gold Coast Express': 'scheduled',
        'Big Blue Express': 'scheduled',
        'Shirley Lake Express': 'scheduled',
        'Siberia Express': 'scheduled',
        'Solitude': 'scheduled',
        'Broken Arrow': 'scheduled',
        'Granite Chief': 'scheduled',
        'Headwall Express': 'scheduled',
        'Silverado': 'scheduled'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
