const superagent = require('superagent');
const debug = require('debug')('liftie:weather');

const millis = require('../tools/millis');
const limiter = require('../tools/limiter');
const { iconsFrom } = require('./icons');

// not more than 30 a minute (60 per documentation)
const limit = limiter(30, millis.minute);

module.exports = fetch;

function tempInF(kelvins) {
  return Math.round((kelvins - 273.15) * 1.8) + 32;
}

function snowInInches(snow) {
  if (!snow) {
    return 0;
  }
  snow *= 0.0393701; // millimeters to inches
  return Math.round(snow);
}


const PERIODS = {
  d: 'day',
  n: 'night'
};

// see: https://openweathermap.org/weather-conditions
const KEYS = {
  '01': 'skc', // clear sky
  '02': 'few', // few clouds
  '03': 'sct', // scattered clouds
  '04': 'bkn', // broken clouds
  '09': 'rain_showers', // shower rain
  '10': 'rain', // rain
  '11': 'tsra', // thunderstorm
  '13': 'snow', // snow
  '50': 'fog', // mist
};

function icons(code) {
  const match = code.match(/(\d+)(d|n)/);
  if (!match) {
    return ['', ''];
  }
  const [, key, period] = match;
  return iconsFrom(PERIODS[period], KEYS[key]);
}

function sanitize({ city, list }) {
  const { dt_txt, main, weather, snow = {} } = list[0];

  debug(dt_txt, main, weather, snow);

  const notice = {
    href: `https://openweathermap.org/city/${city.id}`,
    img: 'https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/logo_OpenWeatherMap_orange.svg',
    width: 160,
    site: 'openweathermap.org'
  };
  return {
    date: dt_txt.slice(0, 10),
    icon: icons(weather[0].icon),
    text: weather[0].description,
    conditions: weather[0].main,
    temperature: {
      min: tempInF(main.temp_min),
      max: tempInF(main.temp_min)
    },
    snow: snowInInches(snow['3h']),
    notice
  };
}

function fetch(resort, appid, fn) {
  limit((err) => {
    if (err) {
      debug('Weather API limit %s', resort.id);
      return fn(err);
    }
    debug('request weather for %s', resort.id);
    superagent
      .get('https://api.openweathermap.org/data/2.5/forecast')
      .query({
        lon: resort.ll[0],
        lat: resort.ll[1],
        appid
      })
      .end((err, res) => {
        if (err) {
          console.error('Weather fetch error', resort.name, err.status);
          return fn(err.status);
        }
        fn(null, sanitize(res.body));
      });
  });
}
