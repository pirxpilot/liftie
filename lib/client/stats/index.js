const Chart = require('chart');

module.exports = stats;

/*global document */

const colors = {
  open: 'hsl(136, 100%, 36%)',
  scheduled: 'hsl(217, 83%, 36%)',
  hold: 'hsl(38, 100%, 50%)',
  closed: 'hsl(7, 100%, 50%)'
};

function renderChart(ctx, data) {
  data = Object.keys(colors).map(state => ({
    value: data[state],
    color: colors[state]
  }));

  new Chart(ctx).Pie(data);
}

function stats() {
  const el = document.querySelector('.stats canvas[data-stats]');
  if (!el) {
    return;
  }
  const ctx = el.getContext('2d');
  const data = JSON.parse(el.dataset.stats);

  renderChart(ctx, data);
}
