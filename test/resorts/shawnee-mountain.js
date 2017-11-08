var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('shawnee-mountain');

/*global describe, it */
describe('parse shawnee-mountain', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/shawnee-mountain.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'B. Arrowhead': 'closed',
        'C. Tomahawk': 'closed',
        'D. Tecumseh': 'closed',
        'E. Lookout': 'closed',
        'F. Bushkill': 'closed',
        'G. Little Chief': 'closed',
        'H. Little Chief': 'closed',
        'I. Learning Center': 'closed',
        'Skiwee': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
