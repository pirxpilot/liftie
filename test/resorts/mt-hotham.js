const should = require('should');
const { createReadStream } = require('fs');
const parser = require('../../lib/lifts/parser');
const parse = require('../../lib/lifts/parse')('mt-hotham');
 /*global describe, it */
describe('parse mt-hotham', function() {
   it('should return lift status', function(done) {
    const stream = createReadStream(`${__dirname}/example/mt-hotham.html`);
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      const expected = {
        'Audi Quattro': 'closed',
        'Big D': 'closed',
        'Blue Ribbon': 'closed',
        'The Drift': 'closed',
        'Gotcha': 'closed',
        'Heavenly Valley': 'closed',
        'Keogh\'s': 'closed',
        'Orchard': 'closed',
        'Playground': 'closed',
        'Road Runner': 'closed',
        'Summit': 'closed',
        'Summit Trainer': 'closed',
        'Dinner Plain': 'closed',
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});