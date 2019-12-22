const assert = require('assert');
const fs = require('fs');
const parser = require('../../lib/lifts/parser');
const parse = require('../../lib/lifts/parse')('sugarbowl');

/*global describe, it */
describe('parse sugarbowl', function() {

  it('should return lift status', function(done) {
    const stream = fs.createReadStream(`${__dirname}/example/sugarbowl.html`);
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      const expected = {
        'Lincoln Express': 'scheduled',
        'Judah Express': 'scheduled',
        'Disney Express': 'scheduled',
        'Summit Chair': 'closed',
        'Christmas Tree Express': 'scheduled',
        'Crow\'s Peak': 'scheduled',
        'Jerome Hill Express': 'scheduled',
        'Village Tow': 'scheduled',
        'White Pine (Beginner)': 'scheduled',
        'Flume Carpet': 'scheduled',
        'Nob Hill (Beginner)': 'scheduled',
        'Gondola': 'open',
        'Village Kids Carpet': 'scheduled'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});
