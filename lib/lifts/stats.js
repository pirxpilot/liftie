module.exports = stats;
module.exports.summary = summary;

const states = ['open', 'hold', 'scheduled', 'closed'];

function empty(val) {
  return states.reduce((memo, s) => {
    memo[s] = val;
    return memo;
  }, {});
}

function percentage(status) {
  const all = states.reduce((memo, s) => memo + status[s], 0);
  if (!all) {
    return empty(25);
  }
  return states.reduce((memo, s) => {
    //console.log('status', s, status[s]);
    memo[s] = Math.floor(status[s] * 1000 / all) / 10;
    return memo;
  }, empty());
}

function stats(status) {
  const r = Object.keys(status).reduce((memo, lift) => {
    memo[status[lift]] += 1;
    return memo;
  }, empty(0));
  r.percentage = percentage(r);
  return r;
}

function summary(arr) {
  function add(sum, s) {
    if (!s) {
      return sum;
    }
    states.forEach((state) => {
      sum[state] += s[state] || 0;
    });
    return sum;
  }

  const r = arr.reduce(add, empty(0));
  r.percentage = percentage(r);
  return r;
}
