const superagent = require('superagent');
const debug = require('debug')('liftie:weather');
const { iconsFromUrl } = require('./icons');

module.exports = fetch;

const userAgent = 'Mozilla/5.0 (compatible; Liftie/1.0; +https://liftie.info)';

const {
  LIFTIE_STATIC_HOST: staticHost = ''
} = process.env;

function normalize(data, ll) {
  debug('weather %j', data.properties.periods);

  const {
    endTime,
    temperature,
    icon,
    shortForecast,
    detailedForecast
  } = data.properties.periods[0];

  return {
    date: endTime.slice(0, 10),
    icon: iconsFromUrl(icon),
    text: detailedForecast,
    conditions: shortForecast,
    temperature: {
      max: temperature
    },
    notice: {
      href: `https://forecast.weather.gov/MapClick.php?lat=${ll[1]}&lon=${ll[0]}`,
      img: `${staticHost}/img/noaa-logo.svg`,
      width: 72,
      site: 'noaa.gov'
    }
  };
}

function fetch(resort, fn) {
  debug("fetch weather from NOAA for %s", resort.id);

  const { ll } = resort;

  if (!resort.noaa) {
    return process.nextTick(fn);
  }
  const url = `https://api.weather.gov/gridpoints/${resort.noaa}/forecast`;
  superagent(url)
    .redirects(0)
    .accept('application/geo+json')
    .set('User-Agent', userAgent)
    .then(onData, onError);

  function onError(err) {
    debug('NOAA API error', err);
    fn();
  }

  function onData({ body }) {
    fn(null, normalize(body, ll));
  }
}
