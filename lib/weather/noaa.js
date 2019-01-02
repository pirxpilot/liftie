const getlet = require('getlet');
const { Transform } = require('stream');
const debug = require('debug')('liftie:weather');
const iconsFromUrl = require('./icons');

module.exports = fetch;

const userAgent = 'Mozilla/5.0 (compatible; Liftie/1.0; +https://liftie.info)';

function parse() {
  const chunks = [];

  function transform(chunk, encoding, next) {
    chunks.push(chunk);
    next();
  }

  function safeParse(json) {
    if (!json) {
      return;
    }
    try {
      return JSON.parse(json);
    } catch(e) {
      debug('Error parsing JSON', e);
    }
  }

  function final(next) {
    const o = safeParse(chunks.join(''));
    if (o) {
      this.push(o);
    }
    next();
  }

  return new Transform({
    objectMode: true,
    transform,
    final
  });
}

function points([ lon, lat ]) {
  return `${lat.toFixed(4)},${lon.toFixed(4)}`;
}

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

  if (resort.skipNoaa) {
    return fn();
  }

  const { ll } = resort;
  const url = `https://api.weather.gov/points/${points(ll)}/forecast`;
  getlet(url)
    .userAgent(userAgent)
    .header('Accept', 'application/geo+json')
    .pipe(parse())
    .on('error', onError)
    .on('data', onData);

  function onError(err) {
    debug('NOAA API error', err);
    resort.skipNoaa = true;
    fn();
  }

  function onData(data) {
    fn(null, normalize(data, ll));
  }
}
