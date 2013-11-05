var should = require('should');
var twitter = require('../../lib/twitter');

/*global describe, it*/

describe('twitter', function() {

  it('should return empty tweets if handle is missing', function(done) {
    twitter({}, function(err, tweets) {
      should.not.exist(err);
      should.not.exist(tweets);
      done();
    });
  });

  // configure TWITTER_TOKEN to run the test
  if (process.env.TWITTER_TOKEN) {
    it('should return tweets for valid handle', function(done) {
      twitter({
        twitter: 'cannonmountain',
      }, function(err, result) {
        should.not.exist(err);
        should.exist(result);
        result.should.have.property('user', 'cannonmountain');
        result.should.have.property('tweets');
        result.tweets.forEach(function(t) {
          t.should.have.property('id_str').with.type('string');
          t.should.have.property('created_at').with.type('string');
          Date.now().should.be.above(new Date(t.created_at));
          t.should.have.property('text').with.type('string');
          t.should.have.property('entities').with.type('object');
        });
        done(err);
      });
    });
  } else {
    it.skip('should return tweets for valid handle');
  }
});
