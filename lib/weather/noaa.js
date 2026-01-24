import Debug from 'debug';
import { LIFTIE_STATIC_HOST as staticHost } from '../env.js';
import { iconsFromUrl } from './icons.js';

const debug = Debug('liftie:weather');

const userAgent = 'Mozilla/5.0 (compatible; Liftie/1.0; +https://liftie.info)';

function normalize(data, ll) {
  debug('weather %j', data.properties.periods);

  const { endTime, temperature, icon, shortForecast, detailedForecast } = data.properties.periods[0];

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

export default function fetchWeather(resort, fn) {
  debug('fetch weather from NOAA for %s', resort.id);

  const { ll } = resort;

  if (!resort.noaa) {
    return process.nextTick(fn);
  }
  const url = `https://api.weather.gov/gridpoints/${resort.noaa}/forecast`;
  fetch(url, {
    method: 'GET',
    headers: {
      'User-Agent': userAgent,
      Accept: 'application/geo+json'
    }
  })
    .then(res => res.json())
    .then(body => fn(null, normalize(body, ll)))
    .catch(err => {
      debug('NOAA API error', err);
      fn();
    });
}
