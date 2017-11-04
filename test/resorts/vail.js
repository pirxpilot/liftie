var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/vail');

/*global describe, it */
describe('parse vail', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/vail.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Avanti Express Lift #2': 'closed',
        'Black Forest #27': 'closed',
        'Born Free Express #8': 'closed',
        'Cascade Village #20': 'closed',
        'Eagle Bahn Gondola #19': 'closed',
        'Eagle\'s Nest Carpet #18': 'closed',
        'Eagle\'s Nest Carpet #35': 'closed',
        'Earl\'s Express #38': 'closed',
        'Game Creek Express #7': 'closed',
        'Golden Peak Carpet #25': 'closed',
        'Golden Peak Carpet #29': 'closed',
        'Golden Peak Carpet #33': 'closed',
        'Gopher Hill #12': 'closed',
        'High Noon Express #5': 'closed',
        'Highline Express #10': 'closed',
        'Lionshead Carpet #34': 'closed',
        'Little Eagle #15': 'closed',
        'Mongolia Lift #22': 'closed',
        'Mountain Top Express #4': 'closed',
        'Northwoods Express #11': 'closed',
        'One': 'closed',
        'Orient Express Lift #21': 'closed',
        'Pete\'s Express #39': 'closed',
        'Pride Express Lift #26': 'closed',
        'Riva Bahn Express #6': 'closed',
        'SkyLine Express #37': 'closed',
        'Sourdough Express #14': 'closed',
        'Sun Up Express #9': 'closed',
        'Tea Cup Express #36': 'closed',
        'Wapiti #24': 'closed',
        'Wildwood Express #3': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
