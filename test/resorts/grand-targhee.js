var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('grand-targhee');

/*global describe, it */
describe('parse grand-targhee', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/grand-targhee.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Dreamcatcher': 'closed',
        'Sacajawea': 'closed',
        'Blackfoot': 'closed',
        'Shoshone': 'closed',
        'Papoose': 'closed'
      };
      status.should.eql(expected);
      done(err);
    }));
  });
});
