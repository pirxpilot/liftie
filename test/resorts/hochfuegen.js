var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('hochfuegen');

/*global describe, it */
describe('parse hochfuegen', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/hochfuegen.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        '2er Pfaffenbühel': 'closed',
        '6er KSB Holzalm': 'closed',
        '6er Sesselbahn Waidoffen': 'closed',
        '8er EUB Zillertal Shuttle': 'closed',
        '8er Jet Hochfügen': 'closed',
        'Achteralm': 'closed',
        'Förderband Lamark': 'closed',
        'Hirschbichllift': 'closed',
        'Hochzillertal I': 'closed',
        'Hochzillertal II': 'closed',
        'Hochzillertal III': 'closed',
        'Kindergartenlift Marend': 'closed',
        'Lamarklift I': 'closed',
        'Lamarklift II': 'closed',
        'Lamarklift IV': 'closed',
        'Marendalmlift I': 'closed',
        'Marendalmlift II': 'closed',
        'Neuhüttenbahn': 'closed',
        'Panoramalift': 'closed',
        'Parklift': 'closed',
        'Pfaffenbühel II': 'closed',
        'Pfaffenbühel III': 'closed',
        'Schnee-Express': 'closed',
        'Sonnenjet': 'closed',
        'Topjet': 'closed',
        'Wedelexpress': 'closed',
        'Wimbachexpress': 'closed',
        'Zirbenlift I': 'closed',
        'Zirbenlift II': 'closed',
        'Öfelerbahn': 'closed',
        'Übungslift I': 'closed',
        'Übungslift II': 'closed',
        'Übungslift Telecorde II': 'closed',
        'Übungslift-Telecorde I': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});
