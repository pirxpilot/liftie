var classes = require('classes'),
  day = 24 * 60 * 60 * 1000;

module.exports = render;
module.exports.section = 1;

// .snow
//   .snowfall= resort.snow.snowfall
//   .depth= resort.snow.depth
//   .condition= resort.snow.condition
//   .notice= resort.snow.notice

function renderField(div, field, snow) {
  div.querySelector('.' + field + ' .value').innerHTML = snow[field] || '';
  if (snow[field] !== undefined) {
    classes(div.querySelector('.' + field)).remove('hidden');
  } else {
    classes(div.querySelector('.' + field)).add('hidden');
  }

}

function render(div, snow) {
  if (Date.now() - snow.timestamp > day) {
    return false;
  }
  renderField(div, 'snowfall', snow);
  renderField(div, 'depth', snow);
  renderField(div, 'condition', snow);
  div.querySelector('.notice').innerHTML = snow.notice || '';
  return true;
}
