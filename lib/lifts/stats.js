module.exports = stats;
module.exports.summary = summary;

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

function summary(arr) {
  function add(sum, s) {
    if (!s) {
      return sum;
    }
    states.forEach(function(state) {
      sum[state] += s[state] || 0;
    });
    return sum;
  }

  var r = arr.reduce(add, empty(0));
  r.percentage = percentage(r);
  return r;
}