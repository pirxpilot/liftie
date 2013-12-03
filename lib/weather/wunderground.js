var superagent = require('superagent');
var debug = require('debug')('liftie:weather');
var millis = require('../tools/millis');
var limiter = require('../tools/limiter');


// not more than 5 a minute, not more than 300 a day
var limit = limiter(5, millis.minute, 300, millis.day);

module.exports = fetch;

var apikey = process.env.WUND_API_KEY,
  refkey = process.env.WUND_REF_KEY;

function isoDate(year, month, day) {
  function pad(n) {
    return n < 10 ? '0' + n : n;
  }
  return [year, pad(month), pad(day)].join('-');
}

// see: http://www.wunderground.com/weather/api/d/docs?d=data/index&MR=1
function apiUrl(ll) {
  var query = [ll[1], ll[0]].join(',') + '.json';

  return [
    'http://api.wunderground.com/api',
    apikey,
    'forecast',
    'q',
    query
  ].join('/');
}

var icons = {
  chanceflurries: ['basecloud', 'icon-snowy'],
  chancerain: ['basecloud', 'icon-rainy'],
  chancesleet: ['basecloud', 'icon-sleet'],
  chancesnow: ['basecloud', 'icon-snowy'],
  chancetstorms: ['basecloud', 'icon-thunder'],
  clear: ['basenone', 'icon-sun'],
  cloudy: ['basenone', 'icon-cloud'],
  flurries: ['basecloud', 'icon-snowy'],
  fog: ['basenone', 'icon-mist'],
  hazy: ['basenone', 'icon-mist'],
  mostlycloudy: ['icon-cloud', 'icon-sunny'],
  mostlysunny: ['icon-cloud', 'icon-sunny'],
  partlycloudy: ['icon-cloud', 'icon-sunny'],
  partlysunny: ['icon-cloud', 'icon-sunny'],
  sleet: ['basecloud', 'icon-sleet'],
  rain: ['basecloud', 'icon-rainy'],
  snow: ['basecloud', 'icon-snowy'],
  sunny: ['basenone', 'icon-sun'],
  tstorms: ['basecloud', 'icon-thunder'],
  nt_chanceflurries: ['basecloud', 'icon-snowy'],
  nt_chancerain: ['basecloud', 'icon-rainy'],
  nt_chancesleet: ['basecloud', 'icon-sleet'],
  nt_chancesnow: ['basecloud', 'icon-snowy'],
  nt_chancetstorms: ['basecloud', 'icon-thunder'],
  nt_clear: ['basenone', 'icon-moon'],
  nt_cloudy: ['basenone', 'icon-cloud'],
  nt_flurries: ['basecloud', 'icon-snowy'],
  nt_fog: ['basenone', 'icon-mist'],
  nt_hazy: ['basenone', 'icon-mist'],
  nt_mostlycloudy: ['icon-cloud', 'icon-night'],
  nt_mostlysunny: ['icon-cloud', 'icon-night'],
  nt_partlycloudy: ['icon-cloud', 'icon-night'],
  nt_partlysunny: ['icon-cloud', 'icon-night'],
  nt_sleet: ['basecloud', 'icon-sleet'],
  nt_rain: ['basecloud', 'icon-rainy'],
  nt_snow: ['basecloud', 'icon-snowy'],
  nt_sunny: ['basenone', 'icon-moon'],
  nt_tstorms: ['basecloud', 'icon-thunder']
};

function sanitize(res) {
  var simple = res.forecast.simpleforecast.forecastday[0],
    text = res.forecast.txt_forecast.forecastday[0],
    date = simple.date;
  return {
    date: isoDate(date.year, date.month, date.day),
    icon: icons[simple.skyicon] || ['', ''],
    text: text.fcttext,
    conditions: simple.conditions,
    temperature: {
      min: parseInt(simple.low.fahrenheit, 10),
      max: parseInt(simple.high.fahrenheit, 10)
    },
    snow: parseInt(simple.snow_allday.in, 10)
  };
}

function notice(res, resort) {
  var weatherQuery;
  if (refkey) {
    weatherQuery = resort.ll ? '&query=' + resort.ll[1] + ',' + resort.ll[0] : '';
    res.notice = {
      href: 'http://www.wunderground.com/cgi-bin/findweather/getForecast?apiref=' + refkey + weatherQuery,
      img: 'http://icons.wxug.com/logos/PNG/wundergroundLogo_black_horz.png',
      width: 126,
      site: 'wunderground.com'
    };
  }
  return res;
}

function fetch(resort, fn) {
  if (!apikey) {
    // debug('Configure wunderground.com API key!');
    return process.nextTick(fn);
  }
  if (!Array.isArray(resort.ll) || resort.ll.length != 2) {
    // no error but also nothing to do
    debug('%s - location missing.', resort.id);
    return process.nextTick(fn);
  }
  limit(function(err) {
    if (err) {
      debug('Weather API limit %s', resort.id);
      return fn(err);
    }
    debug('request weather for %s', resort.id);
    superagent
      .get(apiUrl(resort.ll))
      .end(function(res) {
        if(!res.ok) {
          console.error('Weather fetch error', resort.name, res.error);
          fn(res.status);
        }
        fn(null, notice(sanitize(res.body), resort));
      });
  });
}