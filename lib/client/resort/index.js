var dom = require('./dom');

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

var plugins = ['lifts', 'twitter', 'weather', 'webcams', 'snow'].map(function(name) {
  var plugin = require('resort/' + name);
  plugin.type = name;
  return plugin;
});

function renderPlugins(node, getData) {
  var sec = dom.next(node); // extras section
  plugins.forEach(function (plugin) {
    var data = getData(plugin.type), el, show;
    if (!data) {
      return;
    }
    el = plugin.section ? sec.querySelector('.' + plugin.type) : node;
    if (!el) {
      return;
    }
    show = plugin(el, data);
    if (typeof show === 'boolean') {
      el.classList.toggle('visible', show);
      el.classList.toggle('hiddent', !show);
    }
  });
}

function renderProgress(node) {
  var header = node.querySelector('header');
  header.classList.remove('progress');
  // -> triggering reflow -- see: https://css-tricks.com/restart-css-animation/
  void header.offsetWidth;
  header.classList.add('progress');
}

function render(node, resort) {
  var tsPrev = JSON.parse(node.dataset.timestamp);
  var tsCurr = resort.timestamp;

  renderPlugins(node, function (plugin) {
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
  renderProgress(node);
  node.dataset.timestamp = JSON.stringify(tsCurr);
}

function resort(node) {
  function refresh() {
    if (!node.classList.contains('open')) {
      // skip closed resorts
      return;
    }

    fetch('/api/resort/' + node.dataset.resort)
      .then(function(res) { return res.json(); })
      .then(function(resort) { render(node, resort); });
  }

  function init() {
    var ds = node.dataset;

    renderPlugins(node, function (plugin) {
      var data = ds[plugin];
      return data && JSON.parse(data);
    });
  }

  return {
    init: init,
    refresh: refresh,
    node: node
  };
}
