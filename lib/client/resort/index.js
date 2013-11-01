var request = require('superagent');
var classes = require('classes');
var dataset = require('dataset');

module.exports = resort;

function renderOpening(node, opening) {
  if (opening) {
    opening = opening.split('-');
    if (new Date(opening[0], opening[1] - 1, opening[2]).getTime() <= Date.now()) {
      dataset(node, 'opening', '');
      node = node.querySelector('.opening-date');
      node.parentNode.removeChild(node);
    }
  }
}

var plugins = ['lifts'].reduce(function(p, name) {
  p[name] = require('./' + name);
  return p;
}, {});

function render(node, resort) {
  var ds = dataset(node),
    tsPrev = JSON.parse(ds.get('timestamp')),
    tsCurr = resort.timestamp;
  Object.keys(plugins).forEach(function(plugin) {
    if (!resort[plugin] || !tsCurr[plugin]) {
      // no data for a plugin
      return;
    }
    if (tsPrev[plugin] && tsCurr[plugin] <= tsPrev[plugin]) {
      // no new data - skip update
      return;
    }
    plugins[plugin](node, resort[plugin]);
  });
  renderOpening(node, ds.get('opening'));
  ds.set('timestamp', JSON.stringify(tsCurr));
}

var MAX = 12; // update every 12th time

function resort(node) {
  var updateCounter = MAX;

  function updateTimeToRefresh(counter) {
    var ttr = node.querySelector('.time-to-refresh');
    ttr.innerHTML = counter * 5;
  }

  function refresh(now) {
    var id = dataset(node, 'resort');

    if (!classes(node).has('open')) {
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

    request.get('/api/resort/' + id, function(res) {
      render(node, res.body);
    });
  }

  function init() {
    var ds = dataset(node);

    updateTimeToRefresh(MAX);

    Object.keys(plugins).forEach(function(plugin) {
      var data = ds.get(plugin);

      if (!data) {
        // no data for a plugin
        return;
      }
      plugins[plugin](node, JSON.parse(data));
    });
  }

  return {
    init: init,
    refresh: refresh,
    node: node
  };
}
