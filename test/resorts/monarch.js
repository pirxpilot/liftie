const assert = require('assert');
const fs = require('fs');
const parser = require('../../lib/lifts/parser');
const parse = require('../../lib/lifts/parse')('monarch');

/*global describe, it */
describe('parse monarch', function() {

  it('should return lift status', function(done) {
    const stream = fs.createReadStream(`${__dirname}/example/monarch.html`);
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      const expected = {
        'Garfield': 'open',
        'Panorama': 'open',
        'Breezeway': 'open',
        'Pioneer': 'closed',
        'Tumbelina': 'open',
        'Caterpillar': 'open',
        'Kaleidoscope': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});
