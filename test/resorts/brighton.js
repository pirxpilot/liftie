const should = require('should');
const fs = require('fs');
const parser = require('../../lib/lifts/parser');
const parse = require('../../lib/lifts/parse')('brighton');

/*global describe, it */
describe('parse brighton', function() {

  it('should return lift status', function(done) {
    const stream = fs.createReadStream(`${__dirname}/example/brighton.html`);
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      const expected = {
        'Crest Express': 'open',
        'Explorer': 'open',
        'Great Western Express': 'open',
        'Milly Express': 'open',
        'Snake Creek': 'open',
        'Majestic': 'open',
        'Magic Carpet': 'open'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
