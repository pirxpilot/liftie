const should = require('should');
const { createReadStream } = require('fs');
const parser = require('../../lib/lifts/parser');
const parse = require('../../lib/lifts/parse')('sauze');

/*global describe, it */
describe('parse sauze', function() {

  it('should return lift status', function(done) {
    const stream = createReadStream(`${__dirname}/example/sauze.html`);
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      const expected = {
        "SC BOURGET": "closed",
        "SC RIO NERO": "closed",
        "SC TUASSIERES": "closed",
        "SG2 COLO'": "closed",
        "SG3 COTE FAURE": "closed",
        "SG3 TRIPLEX": "closed",
        "SG4 CHAMONIER": "closed",
        "SG4 CLOTES": "closed",
        "SG4* JOUV.-SPORTINIA": "closed",
        "SG4* LAGO NERO": "closed",
        "SG4* ROCCE NERE": "closed",
        "SG4* SPORTINIA": "closed",
        "TP MINISPORTINIA": "closed"
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
