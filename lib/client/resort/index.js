var request = require('superagent');
var classes = require('classes');
var dataset = require('dataset');

module.exports = resort;

var states = ['open', 'hold', 'scheduled', 'closed'];

function removeAllChildren(node) {
  while (node.hasChildNodes()) {
      node.removeChild(node.lastChild);
  }
}

function renderStatus(node, status) {
  removeAllChildren(node);
  if (status) {
    node.innerHTML = Object.keys(status).map(function(name) {
      var klass = "status ls-" + status[name];
      return '<li class="lift">'
        + '<span class="name">' + name + '</span>'
        + '<span class="' + klass + '">'
        + '</span></li>';
    }).join('');
  }
}

function renderStats(node, stats) {
  states.forEach(function(s) {
    node.querySelector('.ls-' + s).innerHTML = stats ? stats[s] : 0;
  });
}

function renderColorBar(node, percentage) {
  states.forEach(function(state) {
    var width = 'width:' + (percentage ? percentage[state] : 25) + '%;';
    node.querySelector('.' + state).setAttribute('style', width);
  });
}

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

var MAX = 12; // update every 12th time

function resort(node) {
  var updateCounter = MAX;

  function render(resort) {
    dataset(node, 'timestamp', resort.timestamp);
    renderStatus(node.querySelector('.lifts'), resort.status);
    renderStats(node.querySelector('.summary'), resort.stats);
    renderColorBar(node.querySelector('.summary-color-bar'), resort.stats && resort.stats.percentage);
    renderOpening(node, dataset(node, 'opening'));
  }

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
      render(res.body);
    });
  }

  function init() {
    updateTimeToRefresh(MAX);
  }

  return {
    init: init,
    refresh: refresh,
    node: node
  };
}
