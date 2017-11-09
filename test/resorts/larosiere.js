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
        'TK Bellecombe': 'scheduled',
        'TK Bellecombe 1': 'scheduled',
        'TK Bellecombe 2': 'scheduled',
        'TK Clarines 1': 'scheduled',
        'TK Clarines 2': 'scheduled',
        'TK Dahu': 'scheduled',
        'TK Lièvre blanc 1': 'scheduled',
        'TK Lièvre blanc 2': 'scheduled',
        'TK Manessier': 'scheduled',
        'TK Plan du repos': 'scheduled',
        'TK Poletta': 'scheduled',
        'TK Sevoliere': 'scheduled',
        'TS Chardonnet': 'scheduled',
        'TS Ecudets': 'scheduled',
        'TS Petit bois': 'scheduled',
        'TSD Les Eucherts': 'scheduled',
        'TSD Roches noires': 'scheduled'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});