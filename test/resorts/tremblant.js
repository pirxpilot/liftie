var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('tremblant');

/*global describe, it */
describe('parse tremblant', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/tremblant.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Flying Mile': 'open',
        'Tapis Magique Équilibre 2': 'closed',
        'Porte du Soleil': 'closed',
        'Tapis Magique Onésime': 'open',
        'Tapis Magique Équilibre 1': 'open',
        'Cabriolet': 'open',
        'Télécabine Express': 'open',
        'TGV': 'open',
        'Duncan Express': 'open',
        'Expo Express': 'open',
        'Lowell Thomas': 'open',
        'Edge': 'closed',
        'Télécabine Casino Express': 'closed',
        'Le Soleil': 'open'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
