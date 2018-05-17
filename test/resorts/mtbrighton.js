var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('mtbrighton');

/*global describe, it */
describe('parse mtbrighton', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/mtbrighton.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Bunny': 'closed',
        'Snowshoe': 'closed',
        'Thalacker’s': 'closed',
        'Sidewinder': 'closed',
        'Sawtooth Ridge': 'closed',
        'Easy Street': 'closed',
        'Gasoline Alley': 'closed',
        'Ryan’s Run': 'closed',
        'Flatiron': 'closed',
        'Larkspur': 'closed',
        'Crosscut': 'closed',
        'Blue Sky': 'closed',
        'Hare': 'closed',
        'Chicken Chute': 'closed',
        'Cheetah': 'closed',
        'Big Riskey': 'closed',
        'Grand River': 'closed',
        'Osprey': 'closed',
        'Golden Eagle': 'closed',
        'Perk’s Folly': 'closed',
        'Challenge': 'closed',
        'Sunrise Bowl': 'closed',
        'Ledges': 'closed',
        'Gopher': 'closed',
        'Riglet Park': 'closed',
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});