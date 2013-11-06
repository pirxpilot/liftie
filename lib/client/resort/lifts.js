var dom = require('./dom');

module.exports = render;
module.exports.section = 0;

var states = ['open', 'hold', 'scheduled', 'closed'];

function renderStatus(node, status) {
  dom.removeAllChildren(node);
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

function render(node, lifts) {
  renderStatus(node.querySelector('.lifts'), lifts.status);
  renderStats(node.querySelector('.summary'), lifts.stats);
  renderColorBar(node.querySelector('.summary-color-bar'), lifts.stats.percentage);
}
