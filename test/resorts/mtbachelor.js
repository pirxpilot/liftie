var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('mtbachelor');

/*global describe, it */
describe('parse mtbachelor', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/mtbachelor.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Pine Marten Express': 'closed',
        'Skyliner Express': 'closed',
        'Sunrise Express': 'closed',
        'Sunshine Accelerator': 'closed',
        'Carrousel Chair': 'closed',
        'Rainbow Chair': 'closed',
        'Red Chair': 'closed',
        'Northwest Express': 'closed',
        'Outback Express': 'closed',
        'Summit Express': 'closed',
        'Hike Zone': 'closed'
      };
      status.should.eql(expected);
      done(err);
    }));
  });
});