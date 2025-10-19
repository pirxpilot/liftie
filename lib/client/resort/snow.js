const day = 24 * 60 * 60 * 1000;

render.section = 1;
render.type = 'snow';

// .snow
//   .snowfall= resort.snow.snowfall
//   .depth= resort.snow.depth
//   .condition= resort.snow.condition
//   .notice= resort.snow.notice

function renderField(div, field, snow) {
  const el = div.querySelector(`.${field}`);
  const value = snow[field];
  el.querySelector('.value').innerHTML = value || '';
  el.classList.toggle('hidden', !value);
}

export default function render(div, snow) {
  if (Date.now() - snow.timestamp > day) {
    return false;
  }
  renderField(div, 'snowfall', snow);
  renderField(div, 'depth', snow);
  renderField(div, 'condition', snow);
  div.querySelector('.notice').innerHTML = snow.notice || '';
  return true;
}
