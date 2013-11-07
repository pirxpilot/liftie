var moment = require('moment');
var dom = require('./dom');

module.exports = render;
module.exports.section = 1;

function splice(str, start, end, replacement) {
  return [str.slice(0, start), replacement, str.slice(end)].join('');
}

function adjustText(tweet) {
  tweet.textAdjustment
  .sort(function(a, b) {
    // sort in reversed order
    return b.indices[0] - a.indices[0];
  })
  .forEach(function(adj) {
    tweet.text = splice(tweet.text, adj.indices[0], adj.indices[1], adj.text);
  });
  delete tweet.textAdjustment;
}

function createTextAdjustment(opt) {
    return {
      indices: opt.indices,
      text: '<a href="' + opt.href + '" target="_blank">' + opt.text + '</a>'
    };
}

function parseEntityType(entities, parsed, type, convertFn) {
  if(!entities[type]) {
    return;
  }
  entities[type].forEach(function(el) {
    var opts, ta;
    opts = convertFn(el);
    if (opts) {
      ta = createTextAdjustment(opts);
      parsed.textAdjustment.push(ta);
    }
  });
}

var entityParsers = {
  hashtags: function(tag) {
    return {
      href: 'https://twitter.com/search/%23' + tag.text,
      text: '#' + tag.text,
      indices: tag.indices
    };
  },
  user_mentions: function(mention) {
    return {
      href: 'https://twitter.com/intent/user?user_id=' + mention.id_str,
      text: '@' + mention.name,
      indices: mention.indices
    };
  },
  urls: function(url) {
    return {
      href: url.expanded_url,
      text: url.display_url,
      indices: url.indices
    };
  }
};

function parseMedia(entities, parsed) {
  if(!entities.media) {
    return;
  }
  entities.media.forEach(function(media) {
    if(!parsed.photo && media.type !== 'photo') {
      return;
    }
    parsed.photo = {
      url: media.expanded_url,
      src: media.media_url_https
    };
    parsed.textAdjustment.push({
      indices: media.indices,
      text: ''
    });
  });
}

// interesting things about the tweet
// item.created_at
// item.text - tweet text
// item.entities - hashtags, urls, user_mentions, media (type: photo)
function parseTweet(tweet, username) {
  var parsed = {
    href: 'https://twitter.com/' + username + '/status/' + tweet.id_str,
    text: tweet.text,
    date: moment(tweet.created_at, 'ddd MMM DD HH:mm:ss ZZ YYYY').fromNow(),
    textAdjustment: []
  };
  parseMedia(tweet.entities, parsed);
  Object.keys(entityParsers).forEach(function(type) {
    parseEntityType(tweet.entities, parsed, type, entityParsers[type]);
  });
  adjustText(parsed);
  return parsed;
}

// .twitter
//   .follow
//   ul.timeline
//     for tweet in resort.twitter.tweets
//       li.tweet
//         a.date(href="https://twitter.com/#{resort.twitter.user}/status/#{tweet.id_str}")= tweet.created_at
//         .text= tweet.text

function tweet2dom(tweet) {
  var img, content = [
    dom.el('a', tweet.date, { href: tweet.href, class: 'date', target: '_blank' }),
    dom.el('div', tweet.text, { class: 'text' })
  ];
  if (tweet.photo) {
    img = dom.el('img', '', { src: tweet.photo.src });
    content.push(dom.el('a', img, { class: 'photo', href: tweet.photo.url,  target: '_blank' }));
  }

  content = content.join('');
  return dom.el('li', content, { class: 'tweet' });
}

function renderTweets(timeline, twitter) {
  timeline.innerHTML = twitter.tweets.map(function(tweet) {
    return parseTweet(tweet, twitter.user);
  })
  .map(tweet2dom)
  .join('');
}

function render(tt, twitter) {
  renderTweets(tt.querySelector('.timeline'), twitter);
  return true;
}