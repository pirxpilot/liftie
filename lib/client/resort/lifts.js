import * as dom from './dom.js';

render.section = 0;
render.type = 'lifts';

const states = ['open', 'hold', 'scheduled', 'closed'];

function renderStatus(node, status) {
  dom.removeAllChildren(node);
  if (status) {
    node.innerHTML = Object.keys(status)
      .map(name => {
        const klass = `status ls-${status[name]}`;
        return `<li class="lift"><span class="name">${name}</span><span class="${klass}"></span></li>`;
      })
      .join('');
  }
}

function renderStats(node, stats) {
  states.forEach(s => (node.querySelector(`.ls-${s}`).innerHTML = stats ? stats[s] : 0));
}

function renderColorBar(node, percentage) {
  states.forEach(state => {
    const width = `width:${percentage ? percentage[state] : 25}%;`;
    node.querySelector(`.${state}`).setAttribute('style', width);
  });
}

export default function render(node, { status, stats }) {
  renderStatus(node.querySelector('.lifts'), status);
  renderStats(node.querySelector('.summary'), stats);
  renderColorBar(node.querySelector('.summary-color-bar'), stats.percentage);
}
