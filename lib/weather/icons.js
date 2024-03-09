const url = require('node:url');

module.exports = {
  iconsFromUrl,
  iconsFrom
};

const DAY = {
  skc: ['basenone', 'icon-sun'],
  few: ['basenone', 'icon-sun'],
  sct: ['icon-cloud', 'icon-sunny'],
  bkn: ['icon-cloud', 'icon-sunny'],
  ovc: ['basenone', 'icon-cloud'],

  wind_skc: ['basenone', 'icon-windy icon-sun'],
  wind_few: ['basenone', 'icon-windy icon-sun'],
  wind_sct: ['icon-cloud', 'icon-windy icon-sunny'],
  wind_bkn: ['icon-cloud', 'icon-windy icon-sunny'],
  wind_ovc: ['basenone', 'icon-windy icon-cloud'],

  rain: ['basecloud', 'icon-rainy'],
  rain_showers: ['basecloud', 'icon-showers icon-sunny'],
  rain_showers_hi: ['basecloud', 'icon-showers icon-sunny'],
  rain_snow: ['basecloud', 'icon-sleet'],
  rain_sleet: ['basecloud', 'icon-sleet'],
  rain_fzra: ['basecloud', 'icon-sleet'],

  tsra: ['basecloud', 'icon-thunder'],
  tsra_sct: ['basecloud', 'icon-thunder icon-sunny'],
  tsra_hi: ['basecloud', 'icon-thunder icon-sunny'],

  snow: ['basecloud', 'icon-snowy'],
  snow_sleet: ['basecloud', 'icon-snowy'],
  snow_fzra: ['basecloud', 'icon-hail icon-snowy'],

  blizzard: ['windysnowcloud', 'icon-snowy'],
  fog: ['basenone', 'icon-mist'],
  cold: ['basecloud', 'icon-frosty'],
  hot: ['basenone', 'icon-sun'],
};

const NIGHT = {
  skc: ['basenone', 'icon-moon'],
  few: ['basenone', 'icon-moon'],
  sct: ['icon-cloud', 'icon-night'],
  bkn: ['icon-cloud', 'icon-night'],
  ovc: ['icon-cloud', 'icon-night'],

  wind_skc: ['basenone', 'icon-windy icon-moon'],
  wind_few: ['basenone', 'icon-windy icon-moon'],
  wind_sct: ['icon-cloud', 'icon-windy icon-night'],
  wind_bkn: ['icon-cloud', 'icon-windy icon-night'],
  wind_ovc: ['icon-cloud', 'icon-windy icon-night'],

  rain: ['basecloud', 'icon-rainy icon-night'],
  rain_showers: ['basecloud', 'icon-showers icon-moon'],
  rain_showers_hi: ['basecloud', 'icon-showers icon-moon'],
  rain_snow: ['basecloud', 'icon-sleet icon-night'],
  rain_sleet: ['basecloud', 'icon-sleet icon-night'],
  rain_fzra: ['basecloud', 'icon-sleet icon-night'],

  tsra: ['basecloud', 'icon-thunder icon-night'],
  tsra_sct: ['basecloud', 'icon-thunder icon-moon'],
  tsra_hi: ['basecloud', 'icon-thunder icon-moon'],

  snow: ['basecloud', 'icon-snowy'],
  snow_sleet: ['basecloud', 'icon-snowy'],
  snow_fzra: ['basecloud', 'icon-hail icon-snowy'],

  blizzard: ['windysnowcloud', 'icon-snowy icon-night'],
  fog: ['basenone', 'icon-mist icon-night'],
  cold: ['basecloud', 'icon-frosty icon-night'],
};

const ICONS = { DAY, NIGHT };

function iconsFromUrl(iconUrl) {
  const { pathname } = url.parse(iconUrl);
  return iconsFrom(...pathname.split('/').slice(-2));
}

function iconsFrom(period = '', key = '') {
  key = key.split(',')[0];
  period = period.toUpperCase();

  const icons = ICONS[period] || DAY;
  return icons[key] || DAY[key] || ['', ''];
}

/*
possible icon values can be retrieved from: https://api.weather.gov/icons

skc             Fair/clear
few             A few clouds
sct             Partly cloudy
bkn             Mostly cloudy
ovc             Overcast

wind_skc        Fair/clear and windy
wind_few        A few clouds and windy
wind_sct        Partly cloudy and windy
wind_bkn        Mostly cloudy and windy
wind_ovc        Overcast and windy

rain            Rain
rain_showers    Rain showers (high cloud cover)
rain_showers_hi Rain showers (low cloud cover)
rain_snow       Rain/snow
rain_sleet      Rain/sleet
rain_fzra       Rain/freezing rain

snow            Snow
snow_sleet      Rain/sleet
snow_fzra       Freezing rain/snow

sleet           Sleet
fzra            Freezing rain

tsra            Thunderstorm (high cloud cover)
tsra_sct        Thunderstorm (medium cloud cover)
tsra_hi         Thunderstorm (low cloud cover)

blizzard        Blizzard
cold            Cold
dust            Dust
fog             Fog/mis
haze            Haze
hot             Hot
hurricane       Hurricane conditions
smoke           Smoke
tornado         Tornado
tropical_storm  Tropical storm conditions

*/
