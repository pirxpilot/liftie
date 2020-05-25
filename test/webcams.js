var test = require('tape');
var webcams = require('../lib/webcams');

require('./replay');

test('webcams should return no webcams if location is missing', function(t) {
  webcams({}, function(err, webcams) {
    t.error(err);
    t.notOk(webcams);
    t.end();
  });
});


test('webcams should return webcams for valid location', function(t) {
  process.env.WEBCAMS_API_KEY = 'TEST_KEY';
  webcams({
    counter: 1,
    ll: [ 7.98, 46.54 ] // from API examples https://developers.webcams.travel/#webcams/examples
  }, function(err, webcams) {
    delete process.env.WEBCAMS_API_KEY;

    t.error(err);
    t.ok(webcams);
    t.ok(webcams.length > 0);

    var webcam = webcams[0];

    t.equal(webcam.name, 'Fieschertal: Jungfrau - Wengen - Interlaken');
    t.ok(webcam.source.startsWith('https://www.windy.com/webcams/1329413077'));
    t.ok(webcam.image.startsWith('https://images-webcams.windy.com'));
    t.ok(webcam.notice.startsWith('Webcams provided by\n<a href="https://www.windy.com/"'));

    t.equal(typeof webcam.mobile, 'object');

    var mobile = webcam.mobile;

    t.equal(mobile.name, 'Fieschertal: Jungfrau - Wengen - Interlaken');
    t.ok(mobile.source.startsWith('https://www.windy.com/webcams/1329413077'));
    t.ok(mobile.image.startsWith('https://images-webcams.windy.com'));
    t.ok(mobile.notice.startsWith('Webcams provided by\n<a href="https://www.windy.com/"'));

    t.end();
  });
});
