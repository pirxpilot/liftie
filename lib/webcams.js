var superagent = require('superagent'),
  debug = require('debug')('liftie:webcams'),
  day = require('./tools/millis').day,
  limiter = require('./tools/limiter');

module.exports = fetch;
module.exports.interval = {
  active: day,
  inactive: Infinity
};

var limit = limiter(12, 'minute');  // 12 times a minute

function fetch(resort, fn) {
  var webcams;
  debug("Fetching webcams for %s", resort.id);
  if (!resort.ll || !process.env.WEBCAMS_DEV_ID) {
    if (resort.webcams && resort.webcams.length) {
      webcams = resort.webcams;
    }
    return process.nextTick(fn.bind(null, null, webcams));
  }
  limit(function(err) {
    if (err) {
      debug('webcams.travel API limit %s', resort.id);
      return fn(err);
    }
    superagent('http://api.webcams.travel/rest')
    .query({
      method: 'wct.webcams.list_nearby',
      devid: process.env.WEBCAMS_DEV_ID,
      lat: resort.ll[1],
      lng: resort.ll[0],
      radius: 2,
      unit: 'mi',
      per_page: 5,
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
      res = res.webcams.webcam.map(function(res) {
        return {
          name: res.title.replace(/'/g, '&apos;'),
          source: res.url,
          image: res.preview_url,
          notice: 'Webcam by <a href="http://webcams.travel" target="_blank">webcams.travel</a>',
          mobile: {
            name: res.title.replace(/'/g, '&apos;'),
            source: res.url_mobile,
            image: res.preview_url,
            notice: 'Webcam by <a href="http://m.webcams.travel" target="_blank">webcams.travel</a>'
          }
        };
      });
      fn(null, res);
    });
  });
}
