var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('ischgl-silvretta-arena');

/*global describe, it */
describe('parse ischgl-silvretta-arena', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/ischgl-silvretta-arena.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Silvrettabahn': 'closed',
        'Pardatschgratbahn': 'closed',
        'Fimbabahn': 'closed',
        'Velillbahn': 'closed',
        'Förderband Viderböden': 'closed',
        'Flimjochbahn': 'closed',
        'Idjochbahn': 'closed',
        'Greitspitzlift': 'closed',
        'Sonnenbahn': 'closed',
        'Übungslift Velill': 'closed',
        'Übungslift Viderböden': 'closed',
        'Gratbahn': 'closed',
        'Förderband Übungsareal': 'closed',
        'Höllbodenbahn': 'closed',
        'Höllkarbahn': 'closed',
        'Sassgalunbahn': 'closed',
        'Nachtweidebahn': 'closed',
        'Lange Wandbahn': 'closed',
        'Palinkopfbahn': 'closed',
        'Zeblasbahn': 'closed',
        'Paznauner Thayabahn': 'closed',
        'Höllspitzbahn': 'closed',
        'Bodenalpbahn': 'closed',
        'Gampenbahn': 'closed',
        'Piz Val Grondabahn': 'closed',
        'Velilleckbahn': 'closed',
        'Pardoramabahn': 'closed',
        'Übungslift Mathon': 'closed',
        'Schwarzwasserlift': 'closed',
        'Doppelstöckige Pendelbahn': 'closed',
        'Luftseilbahn': 'closed',
        'Grivaleabahn': 'closed',
        'Mullerbahn': 'closed',
        'Flimsattelbahn': 'closed',
        'Visnitzbahn': 'closed',
        'Milolift (Übungslift)': 'closed',
        'Viderjochbahn 1': 'closed',
        'Alp Trider Ecklift': 'closed',
        'Alp Trider Sattelbahn': 'closed',
        'Greitspitzbahn': 'closed',
        'Blais Grondalift': 'closed',
        'Viderjochbahn 2': 'closed',
        'Musellalift': 'closed',
        'Förderband Musella 1': 'closed',
        'Förderband Musella 2': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
