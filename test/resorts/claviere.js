const should = require('should');
const { createReadStream } = require('fs');
const parser = require('../../lib/lifts/parser');
const parse = require('../../lib/lifts/parse')('claviere');

/*global describe, it */
describe('parse claviere', function() {

  it('should return lift status', function(done) {
    const stream = createReadStream(`${__dirname}/example/claviere.html`);
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      const expected = {
        'SG2 RAFUYEL': 'closed',
        'SG4 COL BOEUF': 'closed',
        'SG4 GIMONT': 'closed',
        'SG4 LA COCHE': 'closed',
        'SG4 SAGNALONGA-BERCIA': 'closed',
        'SG4* COL SAUREL': 'closed',
        'SG4* SAGNALONGA': 'closed',
        'SG4* SERRA GRANET': 'closed',
        'TP BABY': 'closed'         };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
