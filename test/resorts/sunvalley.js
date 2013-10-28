var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/sunvalley');

/*global describe, it */
describe('parse sunvalley', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/sunvalley.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'River Run': 'open',
        'Christmas': 'open',
        'Sunnyside': 'closed',
        'Greyhawk': 'open',
        'Challenger': 'open',
        'Frenchman\'s': 'open',
        'Lookout': 'open',
        'Roundhouse Express': 'open',
        'Lookout Express': 'open',
        'Flying Squirrel': 'closed',
        'Seattle Ridge': 'open',
        'Cold Springs': 'open',
        'Mayday': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});