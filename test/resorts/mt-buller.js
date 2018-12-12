const should = require('should');
const { createReadStream } = require('fs');
const parser = require('../../lib/lifts/parser');
const parse = require('../../lib/lifts/parse')('mt-buller');

/*global describe, it */
describe('parse mt-buller', function() {

  it('should return lift status', function(done) {
    const stream = createReadStream(`${__dirname}/example/mt-buller.html`);
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      const expected = {
        'Blue Bullet Express': 'closed',
        'Boggy Creek': 'closed',
        'Bonza': 'closed',
        'Bourke Street Carpet': 'closed',
        'Bull Run': 'closed',
        'Canyon Tows': 'closed',
        'Cattleman\'s Carpets': 'closed',
        'Federation': 'closed',
        'Gliders Carpet': 'closed',
        'Grimus': 'closed',
        'Happy Feet Carpet': 'closed',
        'Howqua': 'closed',
        'Koflers': 'closed',
        'Lydia Lassila Chairlift': 'closed',
        'Mercedes-Benz': 'closed',
        'Northside Express': 'closed',
        'Skyline': 'closed',
        'Southside': 'closed',
        'Summit': 'closed',
        'The Fox': 'closed',
        'Tirol': 'closed',
        'Wombat': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
