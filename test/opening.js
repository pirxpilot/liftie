const test = require('node:test');
const assert = require('node:assert/strict');
const opening = require('../lib/opening');
const day = require('../lib/tools/millis').day;

function iso(millis) {
  millis -= (new Date().getTimezoneOffset()) * 60 * 1000;
  const date = new Date(millis);
  return date.toISOString().slice(0, 10);
}

const now = Date.now();
const today = iso(now);
const future = iso(now + 2 * day);
const past = iso(now - 2 * day);

test('opening should be empty for missing dates', function (t, done) {
  opening({}, function (err, od) {
    assert.ok(!od);
    done(err);
  });
});

test('opening should be empty for invalid dates', function (t, done) {
  opening({
    opening: 'abc'
  }, function (err, od) {
    assert.ok(!od);
    done(err);
  });
});

test('opening should be empty for past dates', function (t, done) {
  opening({
    opening: past
  }, function (err, od) {
    assert.ok(!od);
    done(err);
  });
});

test('opening should be empty for today', function (t, done) {
  opening({
    opening: today
  }, function (err, od) {
    assert.ok(!od);
    done(err);
  });
});

test('opening should be present for future dates', function (t, done) {
  opening({
    opening: future
  }, function (err, od) {
    assert.ok(od);
    assert.equal(od, future);
    done(err);
  });
});
