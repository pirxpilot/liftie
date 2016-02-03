var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/wildcat');

/*global describe, it */
describe('parse wildcat', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/wildcat.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Bobcat Triple': 'closed',
        'Snowcat Triple': 'closed',
        'Snowbelt': 'closed',
        'Tomcat Triple': 'closed',
        'Wildcat Express Quad': 'open'
      };
      status.should.eql(expected);
      done(err);
    }));
  });
});