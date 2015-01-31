var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/courchevel');

/*global describe, it */
describe('parse courchevel', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/courchevel.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
  'TC DES VERDONS': 'scheduled',
  'TC DU JARDIN ALPIN': 'scheduled',
  'TSD BIOLLAY': 'scheduled',
  'TSD PRALONG': 'scheduled',
  'TK  ALTIPORT': 'scheduled',
  'TK COSPILLOT': 'scheduled',
  'TK DE BELLECOTE': 'scheduled',
  'TK ETOILES': 'scheduled',
  'TK FERME PRALONG': 'scheduled',
  'TK ROCH. L OMBRE': 'scheduled',
  'TK SOURCES': 'scheduled',
  'TAPIS PRACTICE': 'scheduled',
  'TC TANIA': 'scheduled',
  'TSD BOUC BLANC': 'scheduled',
  'TSD DOU DES LANCHES': 'scheduled',
  'TK GROS MURGER': 'closed',
  'TK TROIKA': 'scheduled',
  'MON TANIA': 'scheduled',
  'MERIBEL MOTTARET VIA SAULIRE': 'closed',
  'MERIBEL VIA COL DE LA LOZE': 'scheduled',
  'MERIBEL VIA SAULIRE': 'closed',
  'TC ARIONDAZ': 'scheduled',
  'TC PETIT MORIOND': 'scheduled',
  'TSD CHAPELETS': 'scheduled',
  'TSD ROC MUGNIER': 'scheduled',
  'TSD SIGNAL': 'scheduled',
  'TK  COMBE': 'scheduled',
  'TK BELVEDERE': 'scheduled',
  'TK GRANGES': 'scheduled',
  'TK MARQUIS': 'scheduled',
  'TK MICKEY': 'scheduled',
  'TK PETITE BOSSE': 'scheduled',
  'TK STADE': 'closed',
  'TK STE AGATHE': 'closed',
  'TS ROC MERLET': 'closed',
  'TSD CHANROSSA': 'closed',
  'TK PYRAMIDES 1': 'closed',
  'TK PYRAMIDES 2': 'closed',
  'TC CHENUS': 'scheduled',
  'TC GRANGETTES': 'scheduled',
  'TC PRAZ': 'scheduled',
  'TB JARD. D ENFANTS': 'scheduled',
  'TSD COQS': 'scheduled',
  'TSD FORET': 'scheduled',
  'TSD PLANTREY': 'scheduled',
  'TSD TOVETS': 'scheduled',
  'TK ENVOLEE': 'scheduled',
  'TK EPICEA': 'scheduled',
  'TK LOZE': 'scheduled',
  'TK ROYS': 'scheduled',
  'Liaison Meribel': 'closed',
  'TPH SAULIRE': 'closed',
  'TC VIZELLE': 'closed',
  'TSD AIGUILLE FRUIT': 'scheduled',
  'TSD MARMOTTES': 'closed',
  'TS CREUX NOIRS': 'closed',
  'TS DES SUISSES': 'closed',
  'Liaison Mottaret': 'closed'


      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
