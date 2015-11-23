var superagent = require('superagent'),
  debug = require('debug')('liftie:weather'),
  moment = require('moment'),
  idmap = require('./opensnow'),
  limiter = require('../tools/limiter'),
  apikey = process.env.OPENSNOW_API_KEY;

module.exports = fetch;

// 12 times a minute
var limit = limiter(12, 'minute');

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
  limit(function(err) {
    var lids = idmap[resort.id];

    if (err) {
      debug('OpenSnow API limit for %s', resort.id);
      return fn(err);
    }
    superagent('http://opensnow.com/api/public/1.0/locations/data')
    .query({
      apikey: apikey,
      lids: lids,
      type: 'json'
    })
    .end(function (err, res) {
      if (err) {
        debug('failed fetch weather for %s with status %s', resort.id, err.status);
        return fn(err.status);
      }
      debug('weather for %s is %s', resort.id, res.text);
      res = JSON.parse(res.text);
      if (!res || !res.results || !res.results['location' + lids]) {
        return fn();
      }
      fn(null, sanitize(res.results['location' + lids]));
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


function findPeriod(forecast, date) {
  var index, period;

  for(index = 1; index < 6; index++) {
    period = forecast['period' + index];
    if (period.date === date && period.day) {
      return period;
    }
  }
}

function forecastDate() {
  var date = moment();
  if (date.hour() >= 17) {
    date.add('days', 1);
  }
  return date.startOf('day').format('YYYY-MM-DD');
}

function sanitize(res) {
  var date = forecastDate(),
    period = findPeriod(res.forecast, date),
    text = period.day.text;

  if (!period) {
    return;
  }

  if (typeof text !== 'string') {
    // hack: opensnowapi may send invalid textual representation
    text = '';
  }

  return {
    date: date,
    icon: icons[period.day.icon] || ['', ''],
    text: text,
    conditions: period.day.weather,
    temperature: {
      max: parseInt(period.day.temp, 10)
    },
    snow: (period.day.snow && period.day.snow !== '0') ? period.day.snow : '',
    notice: {
      href: res.meta.url,
      img: 'https://opensnow.com/img/emailtitle.png',
      width: 100,
      site: 'OpenSnow.com'
    }
  };
}
