var el = require('el');
var tweet2html = require('tweet-html');

module.exports = render;
module.exports.section = 1;

function renderTweets(timeline, twitter) {
  timeline.innerHTML = twitter.tweets.map(function(tweet) {
    return el('li.tweet', tweet2html(tweet, twitter.user));
  })
  .join('');
}

function render(tt, twitter) {
  renderTweets(tt.querySelector('.timeline'), twitter);
  return true;
}
