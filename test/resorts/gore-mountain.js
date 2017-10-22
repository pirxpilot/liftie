var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/gore-mountain');

/*global describe, it */
describe('parse gore-mountain', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/gore-mountain.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Northwoods Gondola': 'closed',
        'Topridge Triple': 'closed',
        'Straight Brook Quad': 'closed',
        'Sunway Chair': 'closed',
        'Adirondack Express II': 'closed',
        'Burnt Ridge Quad': 'closed',
        'High Peaks Chair': 'closed',
        'North Quad': 'closed',
        'J-Bar': 'closed',
        'Bear Cub': 'closed',
        'Greenway Conveyor': 'closed',
        'The Snow Train': 'closed',
        'Village Chair': 'closed',
        'Hudson Chair': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
