const assert = require('assert');
const fs = require('fs');
const parser = require('../../lib/lifts/parser');
const parse = require('../../lib/lifts/parse')('angel-fire');

/*global describe, it */
describe('parse angel-fire', function() {

  it('should return lift status', function(done) {
    const stream = fs.createReadStream(`${__dirname}/example/angel-fire.html`);
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      const expected = {
        'Dreamcatcher': 'open',
        'Lift #2': 'open',
        'Chile Express': 'open',
        'Liberation Park Lift': 'closed',
        'Southwest Flyer': 'open',
        'Ski School Wondercarpet': 'open',
        'Tubing Hill Wondercarpet': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});
