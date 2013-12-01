var classes = require('classes'),
  day = 24 * 60 * 60 * 1000;

module.exports = render;
module.exports.section = 1;

// .weather
//   img(src="http://icons.wxug.com/i/c/i/#{resort.weather.icon}.gif")
//   .temperature!= resort.weather.temperature.max + '&deg;F'
//   .conditions= resort.weather.conditions
//   .text= resort.weather.text
//   .notice Forecast by&nbsp;
//     a(target="_blank")
//       img

function iconUrl(icon) {
  return 'http://icons.wxug.com/i/c/i/' + icon + '.gif';
}

function renderNotice(el, notice) {
  if (!notice) {
    return classes(el).add('hidden');
  }
  classes(el).remove('hidden');
  el = el.querySelector('a');
  el.setAttribute('href', notice.href);
  el.setAttribute('title', 'Go to ' + notice.site);
  el = el.querySelector('img');
  el.setAttribute('src', notice.img);
  el.setAttribute('style', 'width:' + notice.width + 'px;');
  el.setAttribute('alt', notice.site);
}

function render(div, weather) {
  if (Date.now() - weather.timestamp > day) {
    return false;
  }
  div.querySelector('img').setAttribute('src', iconUrl(weather.icon));
  div.querySelector('.temperature').innerHTML = weather.temperature.max + '&deg;F';
  div.querySelector('.conditions').innerHTML = weather.conditions;
  div.querySelector('.text').innerHTML = weather.text;
  renderNotice(div.querySelector('.notice'), weather.notice);
  return true;
}
