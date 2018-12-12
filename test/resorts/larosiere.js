var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('larosiere');

/*global describe, it */
describe('parse larosiere', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/larosiere.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'TSD LES EUCHERTS': 'closed',
        'TSD PLAN DU REPOS': 'closed',
        'TSD ROCHES NOIRES': 'closed',
        'TS ECUDETS': 'closed',
        'TS PETIT BOIS': 'closed',
        'TK CLARINES': 'closed',
        'TK DAHU': 'closed',
        'TK LIEVRE BLANC 1': 'closed',
        'TK LIEVRE BLANC 2': 'closed',
        'TK MANESSIER': 'closed',
        'TK POLETTA': 'closed',
        'TK SEVOLIERE': 'closed',
        'LES LUTINS': 'closed',
        'TSD FORT': 'scheduled',
        'TS CHARDONNET': 'scheduled',
        'TK BELLECOMBE': 'closed',
        'TK BELLECOMBE 1': 'closed',
        'TK BELLECOMBE 2': 'closed',
        'TSD MONT-VALAISAN': 'closed',
        'TSD MOULINS': 'closed',
        'FRANCE - ITALIE': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
