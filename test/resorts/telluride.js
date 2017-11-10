var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('telluride');

/*global describe, it */
describe('parse telluride', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/telluride.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Adult Magic Carpet': 'closed',
        'Apex Lift': 'closed',
        'Children\'s Magic Carpet': 'closed',
        'Chondola': 'closed',
        'Coonskin Lift': 'closed',
        'Free Gondola - Town to MV': 'closed',
        'Gold Hill Express': 'closed',
        'Lynx': 'closed',
        'Oak Street Lift': 'closed',
        'Plunge Lift': 'closed',
        'Polar Queen Express': 'closed',
        'Prospect Express': 'closed',
        'Revelation Lift': 'closed',
        'Sunshine Express': 'closed',
        'UTE Park': 'closed',
        'Village Express': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
