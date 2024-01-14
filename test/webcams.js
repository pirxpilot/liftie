const test = require('node:test');
const assert = require('node:assert/strict');
const webcams = require('../lib/webcams');

require('./replay');

if (process.env.REPLAY !== 'record') {
  process.env.WEBCAMS_API_KEY = 'TEST_KEY';
}

test('webcams should return no webcams if location is missing', (_t, done) => {
  webcams({}, (err, webcams) => {
    assert.ifError(err);
    assert.ok(!webcams);
    done();
  });
});

test('webcams should return webcams for valid location', (_t, done) => {
  webcams({
    counter: 1,
    ll: [7.98, 46.54] // from API examples https://windy.com/webcams/1697038975'
  }, (err, webcams) => {
    delete process.env.WEBCAMS_API_KEY;

    assert.ifError(err);
    assert.ok(webcams);
    assert.ok(webcams.length > 0);

    const webcam = webcams[0];

    assert.equal(webcam.name, 'Fieschertal: Jungfraujoch');
    assert.equal(webcam.source, 'https://windy.com/webcams/1697038975');
    assert.match(webcam.image, /^https:\/\/images-webcams.windy.com\//);
    assert.match(webcam.notice, /^Webcams provided by\n<a href="https:\/\/www.windy.com\/"/);

    done();
  });
});
