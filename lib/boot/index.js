var request = require('superagent');
var init = require('./init');

/*global document window*/


function removeAllChildren(node) {
  while (node.hasChildNodes()) {
      node.removeChild(node.lastChild);
  }
}

function refreshResort(node) {
  var id = node.dataset.resort;
  request.get('/api/resort/' + id, function(res) {
    renderResort(node, res.body);
  });
}

function renderResort(node, resort) {
  renderStatus(node.querySelector('.lifts'), resort.status);
  renderStats(node.querySelector('.summary'), resort.stats);
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

init(function() {
  var resorts = document.querySelectorAll('.resort');
  window.setInterval(function() {
    for (var i = 0; i < resorts.length; i += 1) {
      refreshResort(resorts[i]);
    }
  }, 65 * 1000);
});