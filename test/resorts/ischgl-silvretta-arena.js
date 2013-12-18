var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/ischgl-silvretta-arena');

/*global describe, it */
describe('parse ischgl-silvretta-arena', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/ischgl-silvretta-arena.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        "Silvrettabahn": "open",
        "Pardatschgratbahn": "open",
        "Fimbabahn": "open",
        "Velillbahn": "open",
        "Flimjochbahn": "open",
        "Idjochbahn": "open",
        "Greitspitzlift": "open",
        "Sonnenbahn": "open",
        "Übungslift Velill": "open",
        "Übungslift Viderböden": "open",
        "Gratbahn": "open",
        "Förderband Übungsareal": "open",
        "Förderband Viderböden": "open",
        "Höllbodenbahn": "open",
        "Höllkarbahn": "open",
        "Sassgalunbahn": "open",
        "Nachtweidebahn": "open",
        "Lange Wandbahn": "open",
        "Palinkopfbahn": "open",
        "Zeblasbahn": "open",
        "Paznauner Thayabahn": "open",
        "Höllspitzbahn": "open",
        "Bodenalpbahn": "open",
        "Velilleckbahn": "open",
        "Schwarzwasserlift": "open",
        "Doppelstöckige Pendelbahn": "open",
        "Luftseilbahn": "open",
        "Mullerbahn": "open",
        "Flimsattelbahn": "open",
        "Visnitzbahn": "open",
        "Milolilift (Babylift)": "open",
        "Viderjochbahn 1": "open",
        "Alp Trider Sattelbahn": "open",
        "Greitspitzbahn": "open",
        "Blais Grondalift": "open",
        "Viderjochbahn 2": "open",
        "Musellalift": "open",
        "Förderband Musella 1": "open",
        "Gampenbahn": "closed",
        "Piz Val Grondabahn": "closed",
        "Übungslift Mathon": "closed",
        "Grivaleabahn": "closed",
        "Alp Trider Ecklift": "closed",
        "Förderband Musella 2": "closed"
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});