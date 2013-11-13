var superagent = require('superagent'),
  debug = require('debug')('liftie:webcams'),
  day = require('./tools/millis').day,
  RateLimiter = require('limiter').RateLimiter,
  limiter = new RateLimiter(12, 'minute'); // 12 times a minute

module.exports = fetch;
module.exports.interval = {
  active: day,
  inactive: Infinity
};

function fetch(resort, fn) {
  var webcams;
  debug("Fetching webcams for %s", resort.id);
  if (!resort.ll || !process.env.WEBCAMS_DEV_ID) {
    if (resort.webcams && resort.webcams.length) {
      webcams = resort.webcams;
    }
    return process.nextTick(fn.bind(null, null, webcams));
  }
  if (!limiter.getTokensRemaining()) {
    debug('webcams.travel API limit %s', resort.id);
    return process.nextTick(fn.bind(null, {
      fetchLater: true
    }));
  }
  limiter.removeTokens(1, function() {
    superagent('http://api.webcams.travel/rest')
    .query({
      method: 'wct.webcams.list_nearby',
      devid: process.env.WEBCAMS_DEV_ID,
      lat: resort.ll[1],
      lng: resort.ll[0],
      radius: 2,
      unit: 'mi',
      per_page: 1,
      format: 'json'
    }).end(function (res) {
      if (!res.ok) {
        debug('Failed query webcams for:', resort.id, res.status);
        return fn(res.status);
      }
      debug('Webcams nearby %s:', resort.id, res.text);
      res = JSON.parse(res.text);
      if (res.status !== 'ok') {
        return fn(res.status);
      }
      if (!res.webcams.count) {
        if (resort.webcams && resort.webcams.length) {
          webcams = resort.webcams;
        }
        return fn(null, webcams);
      }
      res = res.webcams.webcam[0];
      res = {
        name: res.title,
        source: res.url,
        image: res.preview_url,
        notice: 'Webcam by <a href="http://webcams.travel" target="_blank">webcams.travel</a>',
        mobile: {
          name: res.title,
          source: res.url_mobile,
          image: res.preview_url,
          notice: 'Webcam by <a href="http://m.webcams.travel" target="_blank">webcams.travel</a>'
        }
      };
      fn(null, [res]);
    });
  });
}
