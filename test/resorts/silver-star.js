var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('silver-star');

/*global describe, it */
describe('parse silver-star', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/silver-star.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Comet Six Pack Express': 'closed',
        'Powder Gulch Express': 'closed',
        'Silver Woods Express': 'closed',
        'Silver Queen Quad Chair': 'closed',
        'Alpine Meadows Quad Chair': 'closed',
        'Summit Chair': 'closed',
        'Home Run Tee': 'closed',
        'Discovery Park Wonder Carpet': 'closed',
        'Star Kids 80\' Wonder Carpet': 'closed',
        'Tube Town Lift #1': 'closed',
        'Tube Town Lift #2': 'closed',
        'Star Kids 180\' Wonder Carpet': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
