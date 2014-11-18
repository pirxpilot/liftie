var should = require('should');
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
        'Promised Land Express': 'closed',
        'Backside Express': 'open',
        'Martis Camp Express': 'closed',
        'Lookout Link': 'closed',
        'Vista Express': 'closed',
        'Comstock Express': 'open',
        'Rendezvous': 'closed',
        'Arrow Bahn Express (#17)': 'open',
        'Arrow Express': 'open',
        'The Big Easy': 'closed',
        'Tahoe Zephyr Express': 'closed',
        'Ursa Major': 'closed',
        'Big Dipper': 'closed',
        'Little Dipper': 'closed',
        'Ritz Bahn': 'closed',
        'Pegasus': 'closed',
        'Big Springs Express': 'open',
        'Highlands Gondola': 'closed',
        'Village Express': 'closed',
        'Orion\'s Belt': 'closed',
        'Timberline Triple': 'closed',
        'Z Lift': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});