module.exports = stats;

var states = ['open', 'hold', 'scheduled', 'closed'];

function empty(val) {
	return states.reduce(function(memo, s) {
		memo[s] = val;
		return memo;
	}, {});
}

function percentage(status) {
	var all = states.reduce(function(memo, s) {
		return memo + status[s];
	}, 0);
	if (!all) {
		return empty(25);
	}
	return states.reduce(function(memo, s) {
		//console.log('status', s, status[s]);
		memo[s] = Math.floor(status[s] * 1000 / all) / 10;
		return memo;
	}, empty());
}

function stats (status) {
  var r = Object.keys(status).reduce(function(memo, lift) {
    memo[status[lift]] += 1;
    return memo;
  }, empty(0));
  r.percentage = percentage(r);
  return r;
}