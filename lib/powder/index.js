var superagent = require('superagent'),
  debug = require('debug')('liftie:powder'),
  moment = require('moment'),
  hour = require('../tools/millis').hour,
  day = require('../tools/millis').day,
  idmap = require('./whereshouldiski'),
  RateLimiter = require('limiter').RateLimiter,
  limiter = new RateLimiter(12, 'minute'); // 12 times a minute

module.exports = fetch;
module.exports.interval = {
  active: 4 * hour,
  inactive: 12 * hour
};

function fetch(resort, fn) {
  debug("Fetching powder rating for %s", resort.id);
  if (!idmap[resort.id]) {
    return process.nextTick(fn.bind(null, null));
  }
  if (!limiter.getTokensRemaining()) {
    debug('whershouldiski API limit %s', resort.id);
    return process.nextTick(fn.bind(null, {
      fetchLater: true
    }));
  }
  limiter.removeTokens(1, function() {
    superagent('http://whereshouldiski.com/lib/reccapi.php')
    .query({
      resort: idmap[resort.id]
    }).end(function (res) {
      if (!res.ok) {
        debug('Failed query powder rating for:', resort.id, res.status);
        return fn(res.status);
      }
      debug('Powder rating in %s:', resort.id, res.text);
      res = JSON.parse(res.text)._source;
      if (!res || !res.powder || res.powder.rating === undefined
          || moment().diff(moment(res.createdOn, 'YYYY-MM-DD HH:mm:ss.SSS')) > day) {
        return fn();
      }
      fn(null, {
        id: res.resort,
        rating: res.powder.rating * 20,
        date: res.date
      });
    });
  });
}
