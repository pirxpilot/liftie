var assert = require('assert');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/resorts/deer-valley');

/*global describe, it */
describe('parse deer-valley', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/deer-valley.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Burns': 'open',
        'Carpenter Express': 'open',
        'Crown Point': 'open',
        'Homestake': 'open',
        'Silver Lake Express': 'open',
        'Snowflake': 'open',
        'Mayflower': 'open',
        'Sterling Express': 'open',
        'Wasatch Express': 'open',
        'Sultan Express': 'open',
        'Mountaineer Express': 'open',
        'Jordanelle Express Gondola': 'open',
        'Empire Express': 'scheduled',
        'Judge': 'open',
        'Northside Express': 'open',
        'Quincy Express': 'open',
        'Red Cloud': 'open',
        'Ruby Express': 'open',
        'Silver Strike Express': 'open',
        'Viking': 'open',
        'Lady Morgan Express': 'open'
      };
      assert.deepEqual(status, expected);
      done(err);
    }));
  });
});