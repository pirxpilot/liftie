var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/sunvalley');

/*global describe, it */
describe('parse sunvalley', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/sunvalley.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        '#01 River Run': 'closed',
        '#02 Roundhouse Express': 'closed',
        '#03 Christmas': 'closed',
        '#04 Cold Springs': 'closed',
        '#05 Lookout Express': 'closed',
        '#07 Greyhawk': 'closed',
        '#08 Frenchman\'s': 'closed',
        '#10 Challenger': 'closed',
        '#11 Lookout': 'closed',
        '#12 Seattle Ridge': 'closed',
        '#14 Mayday': 'closed',
        'Dollar': 'closed',
        'Elkhorn': 'closed',
        'Half Dollar': 'closed',
        'Kinderspielplatz': 'closed',
        'Quarter Dollar': 'closed',
        'The Accelerator': 'closed'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});
