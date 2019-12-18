const should = require('should');
const fs = require('fs');
const parser = require('../../lib/lifts/parser');
const parse = require('../../lib/lifts/parse')('crested-butte');

/*global describe, it */
describe('parse crested-butte', function() {

  it('should return lift status', function(done) {
    const stream = fs.createReadStream(`${__dirname}/example/crested-butte.html`);
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      const expected = {
        'Aspen Carpet': 'open',
        'East River Express': 'closed',
        'Gold Link Lift': 'closed',
        'North Face Lift T-Bar': 'closed',
        'Painter Boy Lift': 'open',
        'Paradise Express': 'open',
        'Peachtree Lift': 'open',
        'Pine Carpet': 'open',
        'Prospect Lift': 'closed',
        'Red Lady Express': 'open',
        'Silver Queen Express': 'open',
        'Spruce Carpet': 'closed',
        'Teocalli Lift': 'open',
        'The High Lift T-Bar': 'closed',
        'West Wall Lift': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
