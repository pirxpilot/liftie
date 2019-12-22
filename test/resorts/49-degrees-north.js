const assert = require('assert');
const fs = require('fs');
const parser = require('../../lib/lifts/parser');
const parse = require('../../lib/lifts/parse')('49-degrees-north');

/*global describe, it */
describe('parse 49-degrees-north', function() {

  it('should return lift status', function(done) {
    const stream = fs.createReadStream(`${__dirname}/example/49-degrees-north.html`);
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      const expected = {
        'Chair 1': 'open',
        'Chair 2': 'closed',
        'Chair 3': 'open',
        'Chair 4': 'open',
        'Chair 5': 'open',
        'Chair 6': 'closed',
        'Chair 7': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});
