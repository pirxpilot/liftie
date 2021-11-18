var test = require('tape');
var twitter = require('../../lib/twitter');

require('../replay');

test('twitter should return empty tweets if handle is missing', function(t) {
  twitter({}, function(err, tweets) {
    t.error(err);
    t.notOk(tweets, 'should have no tweets');
    t.end();
  });
});

var TWITTER_TOKEN = process.env.TWITTER_TOKEN;
process.env.TWITTER_TOKEN = 'TEST_TOKEN';

test('twitter should return tweets for valid handle', function(t) {
  twitter({
    twitter: 'cannonmountain',
  }, function(err, result) {
    t.error(err);
    t.ok(result);
    t.equal(result.user, 'cannonmountain');
    t.ok(result.tweets);

    result.tweets.forEach(function(tweet) {
      t.equal(typeof tweet.id_str, 'string');
      t.equal(typeof tweet.created_at, 'string');
      t.ok(Date.now() > new Date(tweet.created_at));
      t.equal(typeof tweet.text, 'string');
      t.equal(typeof tweet.entities, 'object');
    });
    t.end();
  });
});

process.env.TWITTER_TOKEN = TWITTER_TOKEN;
