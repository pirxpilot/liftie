var debug = require('debug')('liftie:twitter');
var superagent = require('superagent');
var millis = require('../tools/millis');
var limiter = require('../tools/limiter');

var twitterBearerToken = process.env.TWITTER_TOKEN;


// no more than 300 calls per 15 minutes
var limit = limiter(300, 15 * millis.minute);

module.exports = fetch;
module.exports.interval = {
  active: 5 * millis.minute,
  inactive: 6 * millis.hour
};

function trim(tweet) {
  var r = {
    text: tweet.full_text || tweet.text,
  };
  ['id_str', 'created_at', 'entities'].forEach(function(prop) {
    r[prop] = tweet[prop];
  });
  return r;
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

  limit(function(err) {
    if (err) {
      debug('Twitter API limit %s', resort.id);
      return fn(err);
    }
    superagent('https://api.twitter.com/1.1/statuses/user_timeline.json')
      .query({
        screen_name: resort.twitter,
        count: 6,
        trim_user: 1,
        exclude_replies: 1,
        include_rts: 0,
        include_entities: 1,
        tweet_mode: 'extended'
      })
      .set('Authorization', 'Bearer ' + twitterBearerToken)
      .end(function(err, res) {
        if (err) {
          return fn(err.status);
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
