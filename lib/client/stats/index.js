module.exports = stats;

/* global document */

function stats() {
  const pie = document.querySelector('.stats .pie');
  if (!pie) {
    return;
  }
  const data = JSON.parse(pie.dataset.stats);
  let ac = 0;
  const { style } = pie;
  Object.entries(data.percentage).forEach(
    ([key, value]) => style.setProperty(`--${key}`, `${ac += value}%`)
  );
}
