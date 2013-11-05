var dom = require('./dom');
var classes = require('classes');
var day = 24 * 60 * 60 * 1000;

module.exports = render;

// .weather
//   img(src="http://icons.wxug.com/i/c/i/#{resort.weather.icon}.gif")
//   .temperature!= resort.weather.temperature.max + '&deg;F'
//   .conditions= resort.weather.conditions
//   .text= resort.weather.text

function iconUrl(icon) {
  return 'http://icons.wxug.com/i/c/i/' + icon + '.gif';
}

function render(node, weather) {
  var extras = dom.next(node), div;
  if (!extras) {
    return;
  }
  div = extras.querySelector('.weather');
  if (weather || Date.now() - weather.timestamp > day) {
    div.querySelector('img').setAttribute('src', iconUrl(weather.icon));
    div.querySelector('.temperature').innerHTML = weather.temperature.max + '&deg;F';
    div.querySelector('.conditions').innerHTML = weather.conditions;
    div.querySelector('.text').innerHTML = weather.text;
    classes(div).add('visible').remove('hidden');
  }
  else {
    classes(div).add('hidden').remove('visible');
  }
}