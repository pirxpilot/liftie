const should = require('should');
const { createReadStream } = require('fs');
const parser = require('../../lib/lifts/parser');
const parse = require('../../lib/lifts/parse')('sansicario');

/*global describe, it */
describe('parse sansicario', function() {

  it('should return lift status', function(done) {
    const stream = createReadStream(`${__dirname}/example/sansicario.html`);
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      const expected = {
        'SC FRAITEVE DX': 'closed',
        'SC FRAITEVE SX': 'closed',
        'SG4 BABY SANSICARIO': 'closed',
        'SG4* ROCCIA ROTONDA': 'closed',
        'SG4* SKI LODGE - SELLETTE': 'closed',
        'TC8* CESANA - SKI LODGE': 'closed',
        'TP FRAITEVE': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
