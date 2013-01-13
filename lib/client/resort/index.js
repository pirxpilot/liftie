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
  node.innerHTML = Object.keys(status).map(function(name) {
    var klass = "status ls-" + status[name];
    return '<li class="lift">'
      + '<span class="name">' + name + '</span>'
      + '<span class="' + klass + '">'
      + '</span></li>';
  }).join('');
}

function renderStats(node, stats) {
  states.forEach(function(s) {
    node.querySelector('.ls-' + s).innerHTML = stats[s];
  });
}

function renderColorBar(node, percentage) {
  states.forEach(function(state) {
    var width = 'width:' + percentage[state] + '%;';
    node.querySelector('.' + state).setAttribute('style', width);
  });
}

var MAX = 12; // update every 12th time

function resort(node) {
  var updateCounter = MAX;

  function render(resort) {
    dataset(node, 'timestamp', resort.timestamp);
    renderStatus(node.querySelector('.lifts'), resort.status);
    renderStats(node.querySelector('.summary'), resort.stats);
    renderColorBar(node.querySelector('.summary-color-bar'), resort.stats.percentage);
  }

  function updateTimeToRefresh(millis) {
    var ttr = node.querySelector('.time-to-refresh');
    ttr.innerHTML = (millis / 1000).toFixed();
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
      updateTimeToRefresh(updateCounter * 5000);
      return;
    }
    updateCounter = MAX;

    request.get('/api/resort/' + id, function(res) {
      render(res.body);
      updateTimeToRefresh(updateCounter * 5000);
    });
  }

  return {
    refresh: refresh,
    node: node
  };
}
