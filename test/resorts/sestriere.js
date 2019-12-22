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
        "FV PATTEMOUCHE": "open",
        "SC BABY DX": "open",
        "SC BABY SX": "open",
        "SC COMBETTA": "closed",
        "SC LA MOTTA": "closed",
        "SC ORSIERA": "open",
        "SC SISES": "closed",
        "SG4 CAPRET": "closed",
        "SG4 GARNEL": "open",
        "SG4 NUBE D'ARGENTO": "closed",
        "SG4* BANCHETTA": "open",
        "SG4* CIT ROC": "open",
        "SG4* NUOVA NUBE": "open",
        "SG4* TREBIALS": "open",
        "TC8* SESTR.- FRAITEVE": "open",
        "TP JOLLY SX": "open",
        "TP. ANFITEATRO": "open",
        "TP. JOLLY DX": "open",
        "TP. PRINCIPI": "open",
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
