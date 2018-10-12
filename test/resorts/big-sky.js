var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('big-sky');

/*global describe, it */
describe('parse big-sky', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/big-sky.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Cascade Triple': 'closed',
        'Little Thunder Double': 'closed',
        'Challenger Triple': 'closed',
        'Derringer Quad': 'closed',
        'Explorer Double': 'closed',
        'Bear Back Platter': 'closed',
        'Headwaters Double': 'closed',
        'Iron Horse Quad': 'closed',
        'Lone Moose Triple': 'closed',
        'Lone Peak Tram': 'closed',
        'Powder Seeker High Speed Six-Place': 'closed',
        'Dakota Triple': 'closed',
        'Lone Tree Quad': 'closed',
        'Pony Express Triple': 'closed',
        'Ramcharger Quad': 'closed',
        'Shedhorn Double': 'closed',
        'Six Shooter High Speed Six-Place': 'closed',
        'Southern Comfort Quad': 'closed',
        'Lewis and Clark Quad': 'closed',
        'Cabin Triple': 'closed',
        'Sacajawea Triple': 'closed',
        'Homer': 'closed',
        'Pull-Up': 'closed',
        'Tweener': 'closed',
        'Stagecoach Double': 'closed',
        'Swift Current Quad': 'closed',
        'Small Fry': 'closed',
        'Thunder Wolf Quad': 'closed',
        'White Otter Double': 'closed',
        'Beehive Basin': 'closed',
        'Bear Basin': 'closed',
        'Middle Basin': 'closed',
        'Skiwee': 'closed',
        'Pea Shooter': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
