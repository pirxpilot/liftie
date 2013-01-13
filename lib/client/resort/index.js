var request = require('superagent');
var classes = require('classes');
var dataset = require('dataset');

module.exports = resort;

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
  removeAllChildren(node);
  node.innerHTML = Object.keys(stats).map(function(stat) {
    var klass = "ls-" + stat;
    return '<li><span class="' + klass + '">'
      + '&nbsp;' + stats[stat] + '&nbsp;'
      + '</span><span>' + stat + '</span></li>';
  }).join('');
}


var MAX = 12; // update every 12th time

function resort(node) {
  var updateCounter = MAX;

  function render(resort) {
    dataset(node, 'timestamp', resort.timestamp);
    renderStatus(node.querySelector('.lifts'), resort.status);
    renderStats(node.querySelector('.summary'), resort.stats);
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
      console.log(updateCounter);
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
