const dom = require('./dom');

module.exports = resort;

function renderOpening(node, opening) {
  if (opening) {
    opening = opening.split('-');
    if (new Date(opening[0], opening[1] - 1, opening[2]).getTime() <= Date.now()) {
      node.dataset.opening = '';
      node = node.querySelector('.opening-date');
      node.parentNode.removeChild(node);
    }
  }
}

const plugins = [
  require('../resort/lifts'),
  require('../resort/weather'),
  require('../resort/webcams'),
  require('../resort/snow')
];

function renderPlugins(node, getData) {
  const sec = dom.next(node); // extras section
  plugins.forEach(plugin => {
    const data = getData(plugin.type);
    if (!data) {
      return;
    }
    const el = plugin.section ? sec.querySelector(`.${plugin.type}`) : node;
    if (!el) {
      return;
    }
    const show = plugin(el, data);
    if (typeof show === 'boolean') {
      el.classList.toggle('visible', show);
      el.classList.toggle('hiddent', !show);
    }
  });
}

function render(node, resort) {
  const tsPrev = JSON.parse(node.dataset.timestamp);
  const tsCurr = resort.timestamp;

  renderPlugins(node, plugin => {
    if (!resort[plugin] || !tsCurr[plugin]) {
      // no data for a plugin
      return;
    }
    if (tsPrev[plugin] && tsCurr[plugin] <= tsPrev[plugin]) {
      // no new data - skip update
      return;
    }
    return resort[plugin];
  });
  renderOpening(node, node.dataset.opening);
  node.dataset.timestamp = JSON.stringify(tsCurr);
}

const MAX = 12; // update every 12th time

function resort(node) {
  let updateCounter = MAX;

  function updateTimeToRefresh(counter) {
    const ttr = node.querySelector('.time-to-refresh');
    ttr.innerHTML = counter * 5;
  }

  function refresh(now) {
    const id = node.dataset.resort;

    if (!node.classList.contains('open')) {
      // skip closed resorts
      return;
    }
    if (now) {
      updateCounter = 0;
    } else {
      updateCounter -= 1;
    }

    if (updateCounter > 0) {
      updateTimeToRefresh(updateCounter);
      return;
    }
    updateCounter = MAX;
    updateTimeToRefresh(updateCounter);

    fetch(`/api/resort/${id}`)
      .then(res => res.json())
      .then(resort => render(node, resort));
  }

  function init() {
    const ds = node.dataset;

    updateTimeToRefresh(MAX);

    renderPlugins(node, plugin => {
      const data = ds[plugin];
      return data && JSON.parse(data);
    });
  }

  return {
    init,
    refresh,
    node
  };
}
