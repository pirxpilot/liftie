var superagent = require('superagent'),
  debug = require('debug')('liftie:weather'),
  moment = require('moment'),
  idmap = require('./opensnow'),
  RateLimiter = require('limiter').RateLimiter,
  limiter = new RateLimiter(12, 'minute'), // 12 times a minute
  apikey = process.env.OPENSNOW_API_KEY;

module.exports = fetch;

function fetch(resort, fn) {
  debug("fetch weather from OpenSnow for %s", resort.id);
  if (!idmap.hasOwnProperty(resort.id)) {
    return process.nextTick(fn);
  }
  if (!apikey) {
    debug('configure OpenSnow API key');
    return process.nextTick(fn.bind(null, {
      fetchLater: true
    }));
  }
  if (!limiter.getTokensRemaining()) {
    debug('OpenSnow API limit for %s', resort.id);
    return process.nextTick(fn.bind(null, {
      fetchLater: true
    }));
  }
  limiter.removeTokens(1, function() {
    superagent('http://opensnow.com/api/getLocationData.php')
    .query({
      apikey: apikey,
      lids: idmap[resort.id],
      type: 'json'
    }).end(function (res) {
      if (!res.ok) {
        debug('failed fetch weather for %s with status %s', resort.id, res.status);
        return fn(res.status);
      }
      debug('weather for %s is %s', resort.id, res.text);
      res = JSON.parse(res.text);
      if (!res) {
        return fn();
      }
      fn(null, sanitize(res));
    });
  });
}

var icons = {
  'bkn.png': ['icon-cloud', 'icon-sunny'],
  'blizzard.png': ['windysnowcloud', 'icon-snowy'],
  'chanceip.png': ['basecloud', 'icon-hail icon-sunny'],
  'chancesn.png': ['basecloud', 'icon-snowy icon-sunny'],
  'cold.png': ['basecloud', 'icon-frosty'],
  'du.png': ['basenone', 'icon-sun'],
  'few.png': ['basenone', 'icon-sun'],
  'fg.png': ['basenone', 'icon-mist'],
  'fu.png': ['basenone', 'icon-cloud'],
  'fzra.png': ['basecloud', 'icon-sleet'],
  'hi_nshwrs.png': ['basecloud', 'icon-showers icon-night'],
  'hi_ntsra.png': ['basecloud', 'icon-thunder icon-night'],
  'hi_shwrs.png': ['basecloud', 'icon-showers icon-sunny'],
  'hi_tsra.png': ['basecloud', 'icon-thunder icon-sunny'],
  'hot.png': ['basenone', 'icon-sun'],
  'ip.png': ['basecloud', 'icon-hail icon-sunny'],
  'mix.png': ['basecloud', 'icon-sleet'],
  'nbkn.png': ['icon-cloud', 'icon-night'],
  'ndu.png': ['basenone', 'icon-moon'],
  'nfew.png': ['basenone', 'icon-moon'],
  'nfg.png': ['icon-cloud', 'icon-night'],
  'nfu.png': ['basenone', 'icon-moon'],
  'nfzra.png': ['basecloud', 'icon-sleet icon-night'],
  'nip.png': ['basecloud', 'icon-hail icon-night'],
  'nmix.png': ['basecloud', 'icon-sleet'],
  'novc.png': ['icon-cloud', 'icon-night'],
  'nra.png': ['basecloud', 'icon-rainy icon-night'],
  'nraip.png': ['basecloud', 'icon-hail icon-night'],
  'nrasn.png': ['basecloud', 'icon-sleet'],
  'nsct.png': ['icon-cloud', 'icon-night'],
  'nsctfg.png': ['icon-moon', 'icon-mist'],
  'nscttsra.png': ['basecloud', 'icon-thunder icon-night'],
  'nshra.png': ['basecloud', 'icon-showers icon-night'],
  'nskc.png': ['basenone', 'icon-moon'],
  'nsn.png': ['basecloud', 'icon-snowy icon-night'],
  'ntsra.png': ['basecloud', 'icon-thunder icon-night'],
  'nwind.png': ['basecloud', 'icon-windy icon-night'],
  'ovc.png': ['basenone', 'icon-cloud'],
  'ra.png': ['basecloud', 'icon-rainy'],
  'raip.png': ['basecloud', 'icon-sleet'],
  'rasn.png': ['basecloud', 'icon-sleet'],
  'sct.png': ['icon-cloud', 'icon-sunny'],
  'sctfg.png': ['icon-sun', 'icon-mist'],
  'scttsra.png': ['basecloud', 'icon-thunder icon-sunny'],
  'shra.png': ['basecloud', 'icon-showers icon-sunny'],
  'skc.png': ['basenone', 'icon-sun'],
  'sn.png': ['basecloud', 'icon-snowy'],
  'tsra.png': ['basecloud', 'icon-thunder'],
  'wind.png': ['basecloud', 'icon-windy icon-sunny']
};

function sanitize(res) {
  var date = moment();
  if (date.hour() >= 17) {
    date.add('days', 1);
  }
  date = date.startOf('day').format('YYYY-MM-DD');
  if (res.location.forecast.period.some(function (period) {
    if (period.date === date && period.day) {
      res = {
        date: date,
        icon: icons[period.day.icon] || ['', ''],
        text: period.day.text,
        conditions: period.day.weather,
        temperature: {
          max: parseInt(period.day.temp, 10)
        },
        snow: parseInt(period.day.snow, 10),
        notice: {
          href: res.location.meta.url,
          img: 'https://opensnow.com/img/webtitle.png',
          width: 100,
          site: 'OpenSnow.com'  
        }
      };
      return true;
    }
  })) {
    return res;
  }
}
