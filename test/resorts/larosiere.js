var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/larosiere');

/*global describe, it */
describe('parse larosiere', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/larosiere.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'TK Clarines 1': 'open',
        'TK Clarines 2': 'open',
        'TK Lièvre blanc 1': 'open',
        'TK Lièvre blanc 1': 'open',
        'TK Manessier': 'open',
        'TK Poletta': 'open',
        'TK Sevoliere': 'open',
        'ES Ecudets': 'open',
        'TSD Roches noires': 'open',
        'TK Dahu': 'open',
        'TK Plan du repos': 'open',
        'TS Petit bois': 'open',
        'TSD Les Eucherts': 'open',
        'TK Bellecombe': 'open',
        'TK Bellecombe 1': 'open',
        'TK Bellecombe 2': 'open',
        'TS Chardonnet': 'open'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});