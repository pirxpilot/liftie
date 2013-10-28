var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/sugarbush');

/*global describe, it */
describe('parse sugarbush', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/sugarbush.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
       'Valley House Double': 'closed',
       'Super Bravo Express Quad': 'hold',
       'Heaven\'s Gate Triple': 'hold',
       'Castle Rock Double': 'open',
       'North Lynx Triple': 'open',
       'Gate House Express': 'open',
       'Village Double': 'open',
       'Sunkid': 'open',
       'Welcome Mat': 'open',
       'Summit Quad': 'open',
       'North Ridge Express Quad': 'open',
       'Green Mountain Express Quad': 'open',
       'Inverness Quad': 'closed',
       'Sunny D Double': 'open',
       'Tommy\'s Toy': 'closed',
       'Slide Brook Express': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});