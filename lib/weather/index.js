import { OPENWEATHER_API_KEY } from '../env.js';
import { hour } from '../tools/millis.js';
import noaa from './noaa.js';
import openweather from './openweather.js';

fetch.interval = {
  active: 2 * hour, // once every 2 hours for active resorts
  inactive: Number.POSITIVE_INFINITY // don't fetch on inactive
};

export default function fetch(resort, fn) {
  // see: https://openweathermap.org/forecast5

  if (resort.noaa) {
    noaa(resort, fn);
  } else if (OPENWEATHER_API_KEY) {
    openweather(resort, OPENWEATHER_API_KEY, fn);
  } else {
    fn('no service configured');
  }
}
