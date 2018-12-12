const should = require('should');
const { createReadStream } = require('fs');
const parser = require('../../lib/lifts/parser');
const parse = require('../../lib/lifts/parse')('coronetpeak');

/*global describe, it */
describe('parse coronetpeak', function() {

  it('should return lift status', function(done) {
    const stream = createReadStream(__dirname + '/example/coronetpeak.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      const expected = {
        'Coronet Express': 'closed',
        'Greengates Express': 'closed',
        'Meadows Learner Express': 'closed',
        'Rocky Gully T-bar': 'closed',
        'Dual Magic Carpet Conveyor': 'closed',
        'Beginner Carpet Conveyor': 'closed',
        'Kaser Ski Conveyor': 'closed',
        'Sunkid Carpet Conveyor': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
