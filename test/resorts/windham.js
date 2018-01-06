var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('windham');

/*global describe, it */
describe('parse windham', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/windham.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Whirlwind High Speed Quad (A)': 'closed',
        'Wheelchair Double Chairlift (B)': 'open',
        'Wonderama Triple Chairlift (C)': 'open',
        'Whiteway Triple Chairlift (D)': 'open',
        'Wooly Bear Conveyor (E)': 'open',
        'Whistler Triple Chairlift (F)': 'open',
        'East Peak Express Quad (G)': 'open',
        'K Triple Chairlift': 'open',
        'Enclave Conveyor L': 'closed',
        'Park Tow': 'closed',
        'Whisper Run Lower': 'open',
        'Whisper Run Upper': 'open'
      };
      status.should.eql(expected);
      done(err);
    }));
  });
});
