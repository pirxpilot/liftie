var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('northstar');

/*global describe, it */
describe('parse northstar', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/northstar.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Arrow Express': 'closed',
        'Backside Express': 'closed',
        'Big Dipper Carpet': 'closed',
        'Big Springs Express Gondola': 'closed',
        'Comstock Express': 'closed',
        'Highlands Gondola': 'closed',
        'Little Dipper Carpet': 'closed',
        'Lookout Link Platter': 'closed',
        'Martis Camp Express': 'closed',
        'Orion\'s Belt': 'closed',
        'Pegasus Carpet': 'closed',
        'Promised Land Express': 'closed',
        'Rendezvous Triple': 'closed',
        'Tahoe Zephyr Express': 'closed',
        'The Big Easy Quad': 'closed',
        'Timberline Triple': 'closed',
        'Tubing Tow': 'closed',
        'Ursa Major Carpet': 'closed',
        'Village Express': 'closed',
        'Vista Express': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
