const getlet = require('getlet');
const debug = require('debug')('liftie:weather');
const parse = require('../tools/parse-json');
const { iconsFromUrl } = require('./icons');

module.exports = fetch;

const userAgent = 'Mozilla/5.0 (compatible; Liftie/1.0; +https://liftie.info)';

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
      img: 'https://www.noaa.gov/sites/all/themes/custom/noaa/images/noaa_logo_circle_72x72.svg',
      width: 36,
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
  getlet(url)
    .userAgent(userAgent)
    .header('Accept', 'application/geo+json')
    .pipe(parse())
    .on('error', onError)
    .on('data', onData);

  function onError(err) {
    debug('NOAA API error', err);
    fn();
  }

  function onData(data) {
    fn(null, normalize(data, ll));
  }
}
