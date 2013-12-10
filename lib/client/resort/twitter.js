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
      if (opts.photo) {
        parsed.photo = opts.photo;
      }
      if (opts.iframe) {
        parsed.iframe = opts.iframe;
      }
      ta = createTextAdjustment(opts);
      parsed.textAdjustment.push(ta);
    }
  });
}

var entityParsers = {
  media: function(media) {
    var data = {
      indices: media.indices,
      text: ''
    };
    if (media.type === 'photo') {
      data.photo = {
        url: media.expanded_url,
        src: media.media_url_https
      };
      return data;
    } else if (media.type === 'youtube' || media.type === 'vimeo') {
      data.iframe = {
        src: media.media_url_https
      };
      return data;
    }
  },
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


var urlPreParsers = [
  {
    type: 'photo',
    regex: /https?:\/\/instagram.com\/p\/([^\s\/]+)\/?/,
    toMediaUrl: function(match) {
      return 'http://instagr.am/p/' + match[1] + '/media/?size=m';
    }
  }, {
    type: 'youtube',
    regex: /https?:\/\/(?:youtu.be\/|(?:m|www).youtube.com\/watch\?v=)(\S+)$/,
    toMediaUrl: function(match) {
      return 'http://www.youtube.com/embed/' + match[1] + '?modestbranding=1&rel=0&theme=light';
    }
  }, {
    type: 'vimeo',
    regex: /https?:\/\/vimeo.com\/(\S+)$/,
    toMediaUrl: function(match) {
      return 'http://player.vimeo.com/video/' + match[1];
    }
  }
];

function preParseUrl(entities, preParser) {
  if (entities.media && entities.media.length) {
    return; // only one media per tweet
  }
  if (!entities.urls) {
    return;
  }
  entities.media = entities.media || [];
  entities.urls = entities.urls.filter(function(url) {
    var match = url.expanded_url.match(preParser.regex);
    if (match) {
      entities.media.push({
        type: preParser.type,
        expanded_url: url.expanded_url,
        indices: url.indices,
        media_url_https: preParser.toMediaUrl(match)
      });
      return false;
    }
    return true;
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
  urlPreParsers.forEach(preParseUrl.bind(null, tweet.entities));
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
    dom.el('a', tweet.date, { href: tweet.href, 'class': 'date', target: '_blank' }),
    dom.el('div', tweet.text, { 'class': 'text' })
  ];
  if (tweet.photo) {
    img = dom.el('img', '', { src: tweet.photo.src });
    content.push(dom.el('a', img, { 'class': 'photo', href: tweet.photo.url,  target: '_blank' }));
  }
  if (tweet.iframe) {
    content.push(dom.el('iframe', '', { src: tweet.iframe.src, 'class': 'video' }));
  }

  content = content.join('');
  return dom.el('li', content, { 'class': 'tweet' });
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