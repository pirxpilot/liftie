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
        'T.C. Express': 'closed',
        'Bunny': 'closed',
        'No Name': 'closed',
        'The Reut': 'closed',
        'The Wall': 'closed',
        'Look Out Vista': 'closed',
        'Covered Wagon 1': 'closed',
        'Covered Wagon 2': 'closed',
        'Magic Carpet 1': 'closed',
        'Magic Carpet 2': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});