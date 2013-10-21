var should = require('should');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/crested-butte');

/*global describe, it */
describe('parse crested-butte', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/crested-butte.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Red Lady Express': 'closed',
        'Silver Queen Express': 'closed',
        'Gold Link Lift': 'closed',
        'Prospect Lift': 'closed',
        'East River Express': 'closed',
        'Teocalli Lift': 'closed',
        'Paradise Express': 'closed',
        'West Wall Lift': 'closed',
        'Twister Lift': 'closed',
        'North Face Lift': 'closed',
        'The High Lift': 'closed',
        'Peachtree Lift': 'closed',
        'Painter Boy Lift': 'closed',
        'Aspen Magic Carpet': 'closed',
        'Pine Magic Carpet': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});