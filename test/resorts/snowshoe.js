var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/snowshoe');

/*global describe, it */
describe('parse snnowshoe', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/snowshoe.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
       'Flying Eagle': 'closed',
       'Cascade': 'closed',
       'Mountaineer': 'closed',
       'Cubb Run': 'closed',
       'Magic Carpet': 'closed',
       'Tow Rope': 'closed',
       'Ballhooter': 'closed',
       'Grabhammer': 'closed',
       'Skidder': 'closed',
       'Powder Monkey': 'closed',
       'Powderidge': 'closed',
       'Soaring Eagle Express': 'closed',
       'Western Express': 'closed',
       'Wonder Carpet': 'closed'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});