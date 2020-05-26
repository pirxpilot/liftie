var test = require('tape');
var opening = require('../lib/opening');
var day = require('../lib/tools/millis').day;

function iso(millis) {
  var date;
  millis -= (new Date().getTimezoneOffset()) * 60 * 1000;
  date = new Date(millis);
  return date.toISOString().slice(0, 10);
}

var now = Date.now();
var today = iso(now);
var future = iso(now + 2 * day);
var past = iso(now - 2 * day);

test('opening should be empty for missing dates', function(t) {
  opening({}, function(err, od) {
    t.notOk(od);
    t.end(err);
  });
});

test('opening should be empty for invalid dates', function(t) {
  opening({
    opening: 'abc'
  }, function(err, od) {
    t.notOk(od);
    t.end(err);
  });
});

test('opening should be empty for past dates', function(t) {
  opening({
    opening: past
  }, function(err, od) {
    t.notOk(od);
    t.end(err);
  });
});

test('opening should be empty for today', function(t) {
  opening({
    opening: today
  }, function(err, od) {
    t.notOk(od);
    t.end(err);
  });
});

test('opening should be present for future dates', function(t) {
  opening({
    opening: future
  }, function(err, od) {
    t.ok(od);
    t.equal(od, future);
    t.end(err);
  });
});
