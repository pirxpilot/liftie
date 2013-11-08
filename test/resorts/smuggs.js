var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/smuggs');

/*global describe, it */
describe('parse smuggs', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/smuggs.xml');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Mogul Mouse\'s Magic': 'closed',
        'Morse Highlands': 'closed',
        'Sir Henry\'s Glider': 'closed',
        'Village': 'closed',
        'Sterling Summit': 'closed',
        'Sterling T-Bar': 'closed',
        'Madonna I Summit': 'closed',
        'Madonna II': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});