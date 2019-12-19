const assert = require('assert');
const fs = require('fs');
const parser = require('../../lib/lifts/parser');
const parse = require('../../lib/lifts/parse')('gunstock');

/*global describe, it */
describe('parse gunstock', function() {

  it('should return lift status', function(done) {
    const stream = fs.createReadStream(`${__dirname}/example/gunstock.html`);
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      const expected = {
        'Panorama': 'open',
        'Penny Pitou Silver Medal': 'open',
        'Pistol': 'open',
        'Ramrod': 'open',
        'Tiger': 'closed',
        'Wonder Carpet': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});
