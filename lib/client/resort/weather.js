var classes = require('classes');
var day = 24 * 60 * 60 * 1000;

module.exports = render;
module.exports.section = 1;

// .weather
//   img(src="http://icons.wxug.com/i/c/i/#{resort.weather.icon}.gif")
//   .temperature!= resort.weather.temperature.max + '&deg;F'
//   .conditions= resort.weather.conditions
//   .text= resort.weather.text

function iconUrl(icon) {
  return 'http://icons.wxug.com/i/c/i/' + icon + '.gif';
}

function render(div, weather) {
  if (Date.now() - weather.timestamp > day) {
    return classes(div).add('hidden').remove('visible');
  }
  div.querySelector('img').setAttribute('src', iconUrl(weather.icon));
  div.querySelector('.temperature').innerHTML = weather.temperature.max + '&deg;F';
  div.querySelector('.conditions').innerHTML = weather.conditions;
  div.querySelector('.text').innerHTML = weather.text;
  classes(div).add('visible').remove('hidden');
}