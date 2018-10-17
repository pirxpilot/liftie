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
        '4SK Heidebahn': 'closed',
        '6SK Wasserkar': 'closed',
        '2SB Mittelstation': 'closed',
        '2SB Gratl': 'closed',
        '6SK Stabele': 'closed',
        'Zentrum Shuttle': 'open',
        'SL Innerwald I': 'closed',
        'SL Innerwald II': 'closed',
        '10EUB Giggijoch': 'closed',
        '6SK Langegg': 'closed',
        'Minilift Giggijoch': 'closed',
        '4SK Hainbachkar': 'closed',
        '4SK Silberbruennl': 'closed',
        '8SK Giggijoch': 'closed',
        '4SK Rosskirpl': 'closed',
        '2SB Rotkogl': 'closed',
        '4SB Seekogl': 'closed',
        '4SK Einzeiger': 'closed',
        '4SK Schwarzkogl': 'closed',
        '8EUB Gletscherexpress': 'closed',
        '8EUB Schwarze Schneid I': 'open',
        '8EUB Schwarze Schneid II': 'open',
        'SL Karleskogl': 'open',
        'SL Seiterjoechl': 'open',
        '6SK Seiterkar': 'closed',
        '8EUB Tiefenbach': 'closed',
        'SL Mutkogl': 'closed',
        'Minilift Tiefenbach': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
