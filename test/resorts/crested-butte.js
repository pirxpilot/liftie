var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('crested-butte');

/*global describe, it */
describe('parse crested-butte', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/crested-butte.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Red Lady Express': 'open',
        'Prospect Lift': 'closed',
        'East River Express': 'closed',
        'Teocalli Lift': 'open',
        'Paradise Express': 'closed',
        'West Wall Lift': 'closed',
        'Twister Lift': 'closed',
        'North Face Lift': 'closed',
        'The High Lift': 'closed',
        'Peachtree Lift': 'open',
        'Painter Boy Lift': 'closed',
        'Aspen Magic Carpet': 'open',
        'Pine Carpet': 'open'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});