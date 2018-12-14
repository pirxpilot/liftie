const should = require('should');
const { createReadStream } = require('fs');
const parser = require('../../lib/lifts/parser');
const parse = require('../../lib/lifts/parse')('falls-creek');

/*global describe, it */
describe('parse falls-creek', function() {

  it('should return lift status', function(done) {
    const stream = createReadStream(`${__dirname}/example/falls-creek.html`);
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      const expected = {
        'HALLEYS COMET': 'closed',
        'TOWERS CHAIR': 'closed',
        'DROVERS DREAM CHAIR': 'closed',
        'BOARD WALK': 'closed',
        'MOUSE TRAP': 'closed',
        'MONKEY BARS': 'closed',
        'PETES TRAIN': 'closed',
        'GULLY CHAIR': 'closed',
        'EAGLE EXPRESS': 'closed',
        'SCOTTS CHAIR': 'closed',
        'RUINED CASTLE CHAIR': 'closed',
        'SUMMIT CHAIR': 'closed',
        'LAKESIDE POMA': 'closed',
        'INTERNATIONAL POMA': 'closed',
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
