var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('monarch');

/*global describe, it */
describe('parse monarch', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/monarch.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Garfield': 'open',
        'Panorama': 'open',
        'Breezeway': 'open',
        'Pioneer': 'closed',
        'Tumbelina': 'open',
        'Caterpillar': 'open'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
