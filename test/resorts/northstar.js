var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/northstar');

/*global describe, it */
describe('parse northstar', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/northstar.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Promised Land Express': 'open',
        'Backside Express': 'open',
        'Martis Camp Express': 'open',
        'Lookout Link': 'open',
        'Vista Express': 'open',
        'Comstock Express': 'open',
        'Rendezvous': 'open',
        'Arrow Express': 'open',
        'The Big Easy': 'open',
        'Tahoe Zephyr Express': 'open',
        'Ursa Major': 'open',
        'Big Dipper': 'open',
        'Little Dipper': 'closed',
        'Tubing Tow': 'open',
        'Pegasus': 'open',
        'Big Springs Express': 'open',
        'Highlands Gondola': 'open',
        'Village Express': 'open',
        'Orion\'s Belt': 'open',
        'Timberline Triple': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});