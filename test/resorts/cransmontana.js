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
        '1 Crans Cry D\'er': 'scheduled',
  '4 Chetseron T 1': 'scheduled',
  '6 Cry D\'er T2': 'scheduled',
  '9 Merignou': 'scheduled',
  '22 Montana Sup': 'scheduled',
  '22 Montana-c. D\'er': 'scheduled',
  '24 Verdets': 'scheduled',
  '27 Pas-du-loup': 'scheduled',
  '41 Bellalui': 'scheduled',
  '42 Zabona': 'scheduled',
  '8 Nationale': 'scheduled',
  'Espace Decouverte': 'scheduled',
  '51 Violettes Expr.': 'scheduled',
  '52 Funitel': 'scheduled',
  '54 Cabane De Bois': 'scheduled',
  '57 Lac': 'scheduled',
  '59 Glacier': 'scheduled',
  '82 Toula Inferieur': 'scheduled',
  '82 Toula Superieur': 'scheduled',
  '85 Tsa': 'scheduled',
  '86 Petit Bonvin': 'scheduled',
  'Golf 2': 'scheduled',
  'Golf Baby': 'scheduled',
  'Tapis Golf': 'scheduled'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
    });
    });
