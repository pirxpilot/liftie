var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/tremblant');

/*global describe, it */
describe('parse tremblant', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/tremblant.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Express Gondola': 'open',
        'Cabriolet': 'closed',
        'Flying Mile': 'closed',
        'TGV': 'closed',
        'Porte du Soleil': 'closed',
        'Le Soleil': 'closed',
        'Casino Express Gondola': 'closed',
        'Duncan Express': 'closed',
        'Expo Express': 'closed',
        'Lowell Thomas': 'closed',
        'Edge': 'closed',
        'Magic Carpet Equilibre 1': 'closed',
        'Magic Carpet Equilibre 2': 'closed',
        'Magic Carpet Onesime': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});