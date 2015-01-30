var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/meribel');

/*global describe, it */
describe('parse meribel', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/meribel.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'TC RHODOS 1': 'scheduled',
          'TC RHODOS 2': 'scheduled',
          'TC SAULIRE EXPRESS1': 'scheduled',
          'TC SAULIRE EXPRESS2': 'closed',
          'TSD ADRET': 'scheduled',
          'TSD ALTIPORT': 'scheduled',
          'TSD DENT BURGIN': 'scheduled',
          'TSD GOLF': 'scheduled',
          'TSD LOZE EXPRESS': 'scheduled',
          'TSF MOREL': 'scheduled',
          'TK DE L ALTIPORT': 'scheduled',
          'TK DES COTES': 'scheduled',
          'COURCHEVEL VIA LOZE': 'closed',
          'COURCHEVEL VIA SAULIRE': 'closed',
          'MENUIRES VIA TOUGNETE': 'closed',
          'MOTTARET VIA SAULIRE': 'closed',
          'MOTTARET VIA TOUGNETE': 'scheduled',
          'ST MARTIN VIA ROC DE FER': 'closed',
          'ST MARTIN VIA TOUGNETE': 'closed',
          'STMARTIN VIA CHERFERIE': 'closed',
          'TC TOUGNETE 1': 'scheduled',
          'TSD OLYMPIC': 'closed',
          'TSD PLAN HOMME': 'scheduled',
          'TSD TOUGNETE 2': 'closed',
          'TSF ROC DE FER': 'scheduled',
          'TK ARPASSON': 'scheduled',
          'TK CAVES': 'scheduled',
          'TK CHERFERIE': 'scheduled',
          'TSD COTE BRUNE': 'closed',
          'TC VALLON': 'closed',
          'TSD MURES ROUGES': 'closed',
          'TC PLATTIERES': 'scheduled',
          'TC PLATTIERES 3': 'closed',
          'TSD CHATELET': 'scheduled',
          'TSD PLAN DES MAINS': 'scheduled',
          'TK SITTELLE': 'scheduled',
          'TC OLYMPE 1': 'scheduled',
          'TC OLYMPE 2': 'scheduled',
          'TC OLYMPE 3': 'scheduled',
          'TC CHALETS': 'scheduled',
          'TSD COMBES': 'scheduled',
          'TS AROLLES': 'scheduled',
          'TS TABLE VERTE': 'closed',
          'TK ROC DE TOUGNE': 'closed',
          'TAPIS DORON': 'scheduled',
          'TAPIS OURSON': 'scheduled',
          'TC PAS DU LAC 1': 'scheduled',
          'TC PAS DU LAC 2': 'closed',
          'TK AIGLE': 'scheduled',
          'MENUIRES VIA 3 MARCHES': 'closed',
          'MENUIRES VIA COL DE LA CHAMBRE': 'closed',
          'MENUIRES VIA MONT DE LA CHALLE': 'closed',
          'ST MARTIN VIA 3 MARCHES': 'closed',
          'ST MARTIN VIA MONT DE LA CHALLE': 'closed',
          'VAL THORENS VIA COL DE LA CHAMBRE': 'closed'
              };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
