const should = require('should');
const { createReadStream } = require('fs');
const parser = require('../../lib/lifts/parser');
const parse = require('../../lib/lifts/parse')('sestriere');

/*global describe, it */
describe('parse sestriere', function() {

  it('should return lift status', function(done) {
    var stream = createReadStream(__dirname + '/example/sestriere.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        "FV PATTEMOUCHE": "closed",
        "SC BABY DX": "closed",
        "SC BABY SX": "closed",
        "SC COMBETTA": "closed",
        "SC LA MOTTA": "closed",
        "SC ORSIERA": "closed",
        "SC SISES": "closed",
        "SG4 CAPRET": "closed",
        "SG4 GARNEL": "closed",
        "SG4 NUBE D'ARGENTO": "closed",
        "SG4* BANCHETTA": "closed",
        "SG4* CIT ROC": "closed",
        "SG4* NUOVA NUBE": "closed",
        "SG4* TREBIALS": "closed",
        "TC8* SESTR.- FRAITEVE": "closed",
        "TP JOLLY SX": "closed",
        "TP. ANFITEATRO": "closed",
        "TP. JOLLY DX": "closed",
        "TP. PRINCIPI": "closed",
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
