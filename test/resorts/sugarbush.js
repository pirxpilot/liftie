var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('sugarbush');

/*global describe, it */
describe('parse sugarbush', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/sugarbush.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
       'Valley House Quad': 'closed',
       'Super Bravo Express Quad': 'scheduled',
       'Heaven\'s Gate Triple': 'scheduled',
       'Castlerock Double': 'closed',
       'North Lynx Triple': 'closed',
       'Gate House Express Quad': 'closed',
       'Village Double': 'closed',
       'Schoolhouse Lift': 'closed',
       'Welcome Mat': 'closed',
       'Summit Quad': 'closed',
       'North Ridge Express Quad': 'closed',
       'Green Mountain Express Quad': 'closed',
       'Inverness Quad': 'closed',
       'Sunshine Double': 'closed',
       'Tommy\'s Toy': 'closed',
       'Slide Brook Express Quad': 'closed'
      };
      status.should.eql(expected);
      done(err);
    }));
  });
});