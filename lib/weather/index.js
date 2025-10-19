import { hour } from '../tools/millis.js';
import noaa from './noaa.js';
import openweather from './openweather.js';

fetch.interval = {
  active: 2 * hour, // once every 2 hours for active resorts
  inactive: Number.POSITIVE_INFINITY // don't fetch on inactive
};

// see: https://openweathermap.org/forecast5
const { OPENWEATHER_API_KEY } = process.env;

export default function fetch(resort, fn) {
  if (resort.noaa) {
    noaa(resort, fn);
  } else if (OPENWEATHER_API_KEY) {
    openweather(resort, OPENWEATHER_API_KEY, fn);
  } else {
    fn('no service configured');
  }
}
