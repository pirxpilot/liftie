const test = require('node:test');
const assert = require('node:assert/strict');
const webcams = require('../lib/webcams');

require('./replay');

test('webcams should return no webcams if location is missing', function (t, done) {
  webcams({}, function (err, webcams) {
    assert.ifError(err);
    assert.ok(!webcams);
    done();
  });
});


test('webcams should return webcams for valid location', function (t, done) {
  process.env.WEBCAMS_API_KEY = 'TEST_KEY';
  webcams({
    counter: 1,
    ll: [7.98, 46.54] // from API examples https://developers.webcams.travel/#webcams/examples
  }, function (err, webcams) {
    delete process.env.WEBCAMS_API_KEY;

    assert.ifError(err);
    assert.ok(webcams);
    assert.ok(webcams.length > 0);

    const webcam = webcams[0];

    assert.equal(webcam.name, 'Fieschertal: Jungfrau - Wengen - Interlaken');
    assert.ok(webcam.source.startsWith('https://www.windy.com/webcams/1329413077'));
    assert.ok(webcam.image.startsWith('https://images-webcams.windy.com'));
    assert.ok(webcam.notice.startsWith('Webcams provided by\n<a href="https://www.windy.com/"'));

    assert.equal(typeof webcam.mobile, 'object');

    const mobile = webcam.mobile;

    assert.equal(mobile.name, 'Fieschertal: Jungfrau - Wengen - Interlaken');
    assert.ok(mobile.source.startsWith('https://www.windy.com/webcams/1329413077'));
    assert.ok(mobile.image.startsWith('https://images-webcams.windy.com'));
    assert.ok(mobile.notice.startsWith('Webcams provided by\n<a href="https://www.windy.com/"'));

    done();
  });
});
