var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/cransmontana');

/*global describe, it */
describe('parse cransmontana', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/cransmontana.xml');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        '1 Crans Cry D\'er': 'open',
        '4 Chetseron T 1': 'open',
        '6 Cry D\'er T2': 'open',
        '9 Merignou': 'open',
        '22 Montana Sup': 'open',
        '22 Montana-c. D\'er': 'open',
        '24 Verdets': 'open',
        '27 Pas-du-loup': 'open',
        '41 Bellalui': 'scheduled',
        '42 Zabona': 'scheduled',
        '8 Nationale': 'open',
        'Espace Decouverte': 'open',
        '51 Violettes Expr.': 'open',
        '52 Funitel': 'scheduled',
        '54 Cabane De Bois': 'open',
        '57 Lac': 'scheduled',
        '59 Glacier': 'scheduled',
        '82 Toula Inferieur': 'scheduled',
        '82 Toula Superieur': 'closed',
        '85 Tsa': 'scheduled',
        '86 Petit Bonvin': 'scheduled',
        'Golf 2': 'open',
        'Golf Baby': 'open',
        'Tapis Golf': 'open'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
    });
    });
