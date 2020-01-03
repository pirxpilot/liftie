const should = require('should');
const fs = require('fs');
const parser = require('../../lib/lifts/parser');
const parse = require('../../lib/lifts/parse')('mount-sunapee');

/*global describe, it */
describe('parse mount-sunapee', function() {

  it('should return lift status', function(done) {
    const stream = fs.createReadStream(`${__dirname}/example/mount-sunapee.html`);
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      const expected = {
        "Sunapee Express": "open",
        "Sunbowl Express": "open",
        "North Peak Triple": "open",
        "Spruce Triple": "closed",
        "Clipper Ship Quad": "open",
        "Middle Carpet": "open",
        "Flying Carpet": "open",
        "Piggyback": "closed",
        "Little Carpet": "closed"
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
