var assert = require('assert');
var twitter = require('../../lib/twitter');

/*global describe, it*/

describe('twitter', function() {

  it('should return empty tweets if handle is missing', function(done) {
    twitter({}, function(err, tweets) {
      assert.ifError(err);
      assert.ok(!tweets);
      done();
    });
  });

  it('should return tweets for valid handle', function(done) {
    twitter({
      twitter: 'cannonmountain',
    }, function(err, result) {
      assert.ifError(err);
      assert.ok(result);
      assert.equal(result.user, 'cannonmountain');
      assert.ok(result.tweets);
      result.tweets.forEach(function(t) {
        assert.equal(typeof t.id_str, 'string');
        assert.equal(typeof t.created_at, 'string');
        assert.ok(Date.now() > new Date(t.created_at));
        assert.equal(typeof t.text, 'string');
        assert.equal(typeof t.entities, 'object');
      });
      done(err);
    });
  });
});
