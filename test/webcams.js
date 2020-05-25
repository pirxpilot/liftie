var assert = require('assert');
var webcams = require('../lib/webcams');

require('./replay');

/*global describe, it*/

describe('webcams', function() {

  it('should return no webcams if location is missing', function(done) {
    webcams({}, function(err, webcams) {
      assert.ifError(err);
      assert.ok(!webcams);
      done();
    });
  });


  it('should return webcams for valid location', function(done) {
    process.env.WEBCAMS_API_KEY = 'TEST_KEY';
    webcams({
      counter: 1,
      ll: [ 7.98, 46.54 ] // from API examples https://developers.webcams.travel/#webcams/examples
    }, function(err, webcams) {
      delete process.env.WEBCAMS_API_KEY;

      var webcam, mobile;

      assert.ifError(err);
      assert.ok(webcams);
      assert.ok(webcams.length > 0);

      webcam = webcams[0];

      assert.equal(webcam.name, 'Fieschertal: Jungfrau - Wengen - Interlaken');
      assert.ok(webcam.source.startsWith('https://www.windy.com/webcams/1329413077'));
      assert.ok(webcam.image.startsWith('https://images-webcams.windy.com'));
      assert.ok(webcam.notice.startsWith('Webcams provided by\n<a href="https://www.windy.com/"'));

      assert.equal(typeof webcam.mobile, 'object');
      mobile = webcam.mobile;

      assert.equal(mobile.name, 'Fieschertal: Jungfrau - Wengen - Interlaken');
      assert.ok(mobile.source.startsWith('https://www.windy.com/webcams/1329413077'));
      assert.ok(mobile.image.startsWith('https://images-webcams.windy.com'));
      assert.ok(mobile.notice.startsWith('Webcams provided by\n<a href="https://www.windy.com/"'));

      done(err);
    });
  });

});
