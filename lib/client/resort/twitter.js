const el = require('el');
const tweet2html = require('tweet-html');

module.exports = render;
module.exports.section = 1;
module.exports.type = 'twitter';

function renderTweets(timeline, {tweets, user}) {
  timeline.innerHTML = tweets
    .map(tweet => el('li.tweet', tweet2html(tweet, user)))
    .join('');
}

function render(tt, twitter) {
  renderTweets(tt.querySelector('.timeline'), twitter);
  return true;
}
