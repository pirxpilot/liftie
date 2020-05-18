const should = require('should');
const { createReadStream } = require('fs');
const parser = require('../../lib/lifts/parser');
const parse = require('../../lib/lifts/parse')('timberline-lodge');

/*global describe, it */
describe('parse timberline-lodge', function() {

  it('should return lift status', function(done) {
    var stream = createReadStream(__dirname + '/example/timberline-lodge.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'lift 1': 'open',
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
