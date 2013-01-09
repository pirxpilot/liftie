var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/parser');
var parse = require('../../lib/resorts/soelden').parse;

/*global describe, it */
describe('parse soelden', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/soelden.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        '8EUB Gaislachkogl I': 'open',
        '3S Gaislachkogl II': 'open',
        'SL Gaislachalm': 'open',
        '4SK Heidebahn': 'open',
        '3SB Wasserkar': 'open',
        'DSB Mittelstation': 'open',
        'DSB Gratlbahn': 'open',
        '6SK Stabele': 'open',
        'Zentrum Shuttle': 'open',
        'SL Innerwald I': 'open',
        'SL Innerwald II': 'open',
        '8EUB Giggijoch': 'open',
        '6SK Langegg': 'open',
        'Minilift Giggijoch': 'open',
        '4SK Hainbachkar': 'open',
        '4SK Silberbrünnl': 'open',
        '8SB Giggijoch': 'open',
        '4SK Roßkirpl': 'open',
        'DSB Rotkogl': 'open',
        '4SL Seekogl': 'open',
        '4SK Einzeiger': 'open',
        '4SK Schwarzkogl': 'open',
        '8EUB Gletscherexpress': 'open',
        '4SK Rettenbachjoch': 'closed',
        '8EUB Schwarze Schneid I': 'open',
        '8EUB Schwarze Schneid II': 'open',
        'SL Karleskogl': 'closed',
        'SL Seiterjöchl': 'open',
        '6SK Seiterkar': 'open',
        '8EUB Tiefenbach': 'open',
        'SL Mutkogl': 'open',
        'SL Panorama': 'closed',
        'Minilift Tiefenbach': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});