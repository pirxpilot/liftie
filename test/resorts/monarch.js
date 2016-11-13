var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/monarch');

/*global describe, it */
describe('parse monarch', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/monarch.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Garfield': 'closed',
        'Panorama': 'closed',
        'Breezeway': 'closed',
        'Pioneer': 'closed',
        'Tumbelina': 'closed',
        'Caterpillar': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
