var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/vail');

/*global describe, it */
describe('parse vail', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/vail.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Avanti Express Lift #2': 'open',
        'Black Forest #27': 'open',
        'Born Free Express #8': 'open',
        'Cascade Village #20': 'open',
        'Eagle Bahn Gondola #19': 'open',
        'Eagle\'s Nest Carpet #18': 'open',
        'Eagle\'s Nest Carpet #35': 'open',
        'Earl\'s Express #38': 'open',
        'Game Creek Express #7': 'open',
        'Golden Peak Carpet #25': 'open',
        'Golden Peak Carpet #29': 'open',
        'Golden Peak Carpet #33': 'open',
        'Gopher Hill #12': 'open',
        'High Noon Express #5': 'open',
        'Highline #10': 'open',
        'Lionshead Carpet #34': 'open',
        'Little Eagle #15': 'open',
        'Mongolia Lift #22': 'closed',
        'Mountain Top Express #4': 'open',
        'Northwoods Express #11': 'open',
        'One': 'open',
        'Orient Express Lift #21': 'open',
        'Pete\'s Express #39': 'open',
        'Pride Express Lift #26': 'open',
        'Riva Bahn Express #6': 'open',
        'SkyLine Express #37': 'open',
        'Sourdough #14': 'open',
        'Sun Up Lift #17': 'open',
        'Tea Cup Express #36': 'open',
        'Wapiti #24': 'closed',
        'Wildwood Express #3': 'open'
      };
      Object.keys(status).forEach(function(lift) {
        assert.equal(status[lift], expected[lift], lift);
      });
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});