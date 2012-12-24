module.exports = function(status) {
  return status.reduce(function(memo, lift) {
    memo[lift.status] += 1;
    return memo;
  }, {
    open: 0,
    closed: 0,
    scheduled: 0,
    hold: 0
  });
};