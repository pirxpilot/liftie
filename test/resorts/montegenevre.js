const should = require('should');
const { createReadStream } = require('fs');
const parser = require('../../lib/lifts/parser');
const parse = require('../../lib/lifts/parse')('montegenevre');

/*global describe, it */
describe('parse montegenevre', function() {

  it('should return lift status', function(done) {
    const stream = createReadStream(`${__dirname}/example/montegenevre.html`);
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      const expected = {
        "SC LA DURANCE": "closed",
        "SC L'ALP": "closed",
        "SC L'ALPET": "closed",
        "SC LE CLOT": "closed",
        "SC LE COL": "closed",
        "SC LE QUERELAY": "closed",
        "SC LES 3 FOURNEOUS": "closed",
        "SC OBELISQUE": "closed",
        "SG2 LE CHALVET SUP.": "closed",
        "SG2 ROCHER ROUGE": "closed",
        "SG4 LA CRETE": "closed",
        "SG4 LE BROUSSET": "closed",
        "SG4 LE MONTQUITAINE": "closed",
        "SG4 LE ROCHER DE L'AIGLE": "closed",
        "SG4 LE TREMPLIN": "closed",
        "SG4 OBSERVATOIRE": "closed",
        "SG4 PRARIAL": "closed",
        "SG4* LES GONDRANS": "closed",
        "TC6* LE CHALVET": "closed",
        "TP LA BUTTE": "closed",
        "TX* LES CHALMETTES": "closed",
        "TX* SERRE THIBAUD": "closed"
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
