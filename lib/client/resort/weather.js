const day = 24 * 60 * 60 * 1000;

module.exports = render;
module.exports.section = 1;
module.exports.type = 'weather';

// .weather
//   .weather-icon
//     ul
//       li(class=#{resort.weather.icon[0]}
//       li(class=#{resort.weather.icon[1]}
//   .snowforecast!= resort.weather.snow + '"'
//   .temperature!= resort.weather.temperature.max + '&deg;F'
//   .conditions= resort.weather.conditions
//   .text= resort.weather.text
//   .notice Forecast by&nbsp;
//     a(target="_blank")
//       img

function renderIcon(li, icon) {
  if (Array.isArray(icon)) {
    icon.forEach((cl, i) => li.item(i).setAttribute('class', cl));
  }
}

function renderNotice(el, notice) {
  if (!notice) {
    return el.classList.add('hidden');
  }
  el.classList.remove('hidden');
  el = el.querySelector('a');
  el.setAttribute('href', notice.href);
  el.setAttribute('title', `Go to ${notice.site}`);
  el = el.querySelector('img');
  el.setAttribute('src', notice.img);
  el.setAttribute('style', `width:${notice.width}px;`);
  el.setAttribute('alt', notice.site);
}

function render(div, weather) {
  if (Date.now() - weather.timestamp > day) {
    return false;
  }
  renderIcon(div.querySelectorAll('.weather-icon > ul > li'), weather.icon);
  div.querySelector('.temperature').innerHTML = `${weather.temperature.max}&deg;F`;
  const snowforecast = div.querySelector('.snowforecast');
  snowforecast.classList.toggle('hidden', !weather.snow);
  if (weather.snow) {
    snowforecast.innerHTML = `${weather.snow}"`;
  }
  div.querySelector('.conditions').innerHTML = weather.conditions;
  div.querySelector('.text').innerHTML = weather.text;
  renderNotice(div.querySelector('.notice'), weather.notice);
  return true;
}
