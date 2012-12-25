module.exports = function(status) {
  return Object.keys(status).reduce(function(memo, lift) {
    memo[status[lift]] += 1;
    return memo;
  }, {
    open: 0,
    closed: 0,
    scheduled: 0,
    hold: 0
  });
};