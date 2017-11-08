var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('attitash');

/*global describe, it */
describe('parse attitash', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/attitash.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'L-1 Top Notch Double': 'closed',
        'L-10 Snowtow': 'closed',
        'L-11 Kachina Triple': 'closed',
        'L-12 Flying Bear D-Quad': 'closed',
        'L-2 Flying Yankee D-Quad': 'closed',
        'L-3 Summit Triple': 'closed',
        'L-4 East Borvig Double': 'closed',
        'L-5 West Borvig Double': 'closed',
        'L-6 Learning Center Triple': 'closed',
        'L-7 Snowbelt': 'closed',
        'L-8 Abenaki Quad': 'closed'
      };
      status.should.eql(expected);
      done(err);
    }));
  });
});