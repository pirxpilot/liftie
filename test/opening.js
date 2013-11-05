var should = require('should');
var opening = require('../lib/opening');
var day = require('../lib/tools/millis').day;

/*global describe, it*/


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

describe('opening', function() {
  it('should be empty for missing dates', function(done) {
    opening({}, function(err, od) {
      should.not.exist(od);
      done(err);
    });
  });

  it('should be empty for invalid dates', function(done) {
    opening({
      opening: 'abc'
    }, function(err, od) {
      should.not.exist(od);
      done(err);
    });
  });

  it('should be empty for past dates', function(done) {
    opening({
      opening: past
    }, function(err, od) {
      should.not.exist(od);
      done(err);
    });
  });

  it('should be empty for today', function(done) {
    opening({
      opening: today
    }, function(err, od) {
      should.not.exist(od);
      done(err);
    });
  });

  it('should be present for future dates', function(done) {
    opening({
      opening: future
    }, function(err, od) {
      should.exist(od);
      od.should.eql(future);
      done(err);
    });
  });
});
