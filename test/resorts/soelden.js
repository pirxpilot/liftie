var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('soelden');

/*global describe, it */
describe('parse soelden', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/soelden.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        '8EUB Gaislachkogl I': 'closed',
        '3S Gaislachkogl II': 'closed',
        'SL Gaislachalm': 'closed',
        '4SB Heidebahn': 'closed',
        '3SB Wasserkar': 'closed',
        '2SB Mittelstation': 'closed',
        '2SB Gratlbahn': 'closed',
        '6SB Stabele': 'closed',
        'Zentrum Shuttle': 'closed',
        'SL Innerwald I': 'closed',
        'SL Innerwald II': 'closed',
        '8EUB Giggijoch': 'closed',
        '6SB Langegg': 'closed',
        'Minilift Giggijoch': 'closed',
        '4SB Hainbachkar': 'closed',
        '4SB Silberbrünnl': 'closed',
        '8SB Giggijoch': 'closed',
        '4SB Roßkirpl': 'closed',
        '2SB Rotkogl': 'closed',
        '4SB Seekogl': 'closed',
        '4SB Einzeiger': 'closed',
        '4SB Schwarzkogl': 'closed',
        '8EUB Gletscherexpress': 'closed',
        '4SB Rettenbachjoch': 'closed',
        '8EUB Schwarze Schneid I': 'open',
        '8EUB Schwarze Schneid II': 'open',
        'SL Karleskogl': 'open',
        'SL Seiterjöchl': 'open',
        '6SB Seiterkar': 'open',
        '8EUB Tiefenbach': 'open',
        'SL Mutkogl': 'open',
        'SL Panorama': 'open',
        'Minilift Tiefenbach': 'open'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});