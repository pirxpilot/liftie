var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/kirkwood');

/*global describe, it */
describe('parse kirkwood', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/kirkwood.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'SnowKirk': 'closed',
        'Caples Crest': 'closed',
        'Iron Horse': 'closed',
        'Sunrise': 'closed',
        'Solitude': 'closed',
        'Cornice Express': 'closed',
        'TC Express': 'closed',
        'Bunny': 'closed',
        'Wagon Wheel': 'closed',
        'The Reut': 'closed',
        'Vista': 'closed',
        'Covered Wagon': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});