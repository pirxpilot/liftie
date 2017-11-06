var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('verbier');

/*global describe, it */
describe('parse verbier', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/verbier.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'La Chaux - Gentianes (Jumbo)': 'open',
        'Tortin - Gentianes': 'open',
        'Gentianes': 'open',
        'Mont - Fort': 'open',
        'Le Châble - Verbier': 'open',
        'Verbier - Ruinettes': 'open',
        'Mayentzet': 'open',
        'La Chaux-Express': 'open',
        'Funispace': 'open',
        'Les Attelas': 'open',
        'La Chaux 2': 'open',
        'Lac des Vaux 1': 'open',
        'Lac des Vaux 2': 'open',
        'Chassoure': 'open',
        'Mont - Gelé': 'closed',
        'Les Esserts': 'open',
        'Les Moulins': 'open',
        'Le Rouge': 'open',
        'Verbier - Savoleyres': 'open',
        'Savoleyres Sud': 'open',
        'La Tournelle': 'open',
        'Tournelle': 'open',
        'La Tzoumaz - Savoleyres': 'open',
        'Tapis Tzoumaz': 'open',
        'Les Etablons': 'open',
        'Taillay': 'open',
        'Savoleyres Nord': 'open',
        'Le Châble - Mayens de Bruson': 'open',
        'Moay': 'open',
        'La Pasay': 'open',
        'Le Grand - Tsai': 'open'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
