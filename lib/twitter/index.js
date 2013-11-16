var RateLimiter = require('limiter').RateLimiter;
var millis = require('../tools/millis');
var debug = require('debug')('liftie:twitter');
var superagent = require('superagent');

var twitterBearerToken = process.env.TWITTER_TOKEN;
// no more than 300 calls per minute
var limiter = new RateLimiter(300, 15 * millis.minute);

module.exports = fetch;
module.exports.interval = {
  active: 5 * millis.minute,
  inactive: 6 * millis.hour
};

function trim(tweet) {
  return ['id_str', 'created_at', 'text', 'entities'].reduce(function(r, prop) {
    r[prop] = tweet[prop];
    return r;
  }, {});
}

// API docs: https://dev.twitter.com/docs/api/1.1/get/statuses/user_timeline
function fetch(resort, fn) {
  if (!twitterBearerToken) {
    debug('Configure Twitter bearer token.');
    return process.nextTick(fn);
  }

  if (!resort.twitter) {
    // debug('Twitter handle for %s missing', resort.id);
    return process.nextTick(fn);
  }

  if (!limiter.getTokensRemaining()) {
    debug('Twitter API limit %s', resort.id);
    return process.nextTick(fn.bind(null, {
      fetchLater: true
    }));
  }

  limiter.removeTokens(1, function() {
    superagent('https://api.twitter.com/1.1/statuses/user_timeline.json')
      .query({
        screen_name: resort.twitter,
        count: 6,
        trim_user: 1,
        exclude_replies: 1,
        include_rts: 0,
        include_entities: 1
      })
      .set('Authorization', 'Bearer ' + twitterBearerToken)
      .end(function(res) {
        if (!res.ok) {
          return fn(res.status);
        }
        var tweets = res.body.map(trim);
        if (tweets.length > 3) {
          tweets.length = 3;
        }
        debug('Tweets for %s - %j', resort.id, tweets);
        fn(null, {
          user: resort.twitter,
          tweets: tweets
        });
      });
  });
}