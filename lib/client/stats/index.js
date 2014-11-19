var dataset = require('dataset');
var Chart = require('chart');

module.exports = stats;

/*global document */

var colors = {
  open: 'hsl(136, 100%, 36%)',
  scheduled: 'hsl(217, 83%, 36%)',
  hold: 'hsl(38, 100%, 50%)',
  closed: 'hsl(7, 100%, 50%)'
};

function renderChart(ctx, data) {
  data = Object.keys(colors).map(function(state) {
    return {
      value: data[state],
      color: colors[state]
    };
  });

  new Chart(ctx).Pie(data);
}

function stats() {
  var el = document.querySelector('.stats canvas[data-stats]'), data, ctx;
  if (!el) {
    return;
  }
  ctx = el.getContext('2d');
  data = JSON.parse(dataset(el, 'stats'));

  renderChart(ctx, data);
}