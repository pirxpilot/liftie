var superagent = require('superagent'),
  debug = require('debug')('liftie:powder'),
  moment = require('moment'),
  hour = require('../tools/millis').hour,
  day = require('../tools/millis').day,
  limiter = require('../tools/limiter'),
  idmap = require('./whereshouldiski');

module.exports = fetch;
module.exports.interval = {
  active: 4 * hour,
  inactive: 12 * hour
};

var limit = limiter(12, 'minute');

function fetch(resort, fn) {
  debug("Fetching powder rating for %s", resort.id);
  if (!idmap[resort.id]) {
    return process.nextTick(fn.bind(null, null));
  }
  limit(function(err) {
    if (err) {
      debug('whershouldiski API limit %s', resort.id);
      return fn(err);
    }
    superagent('http://whereshouldiski.com/lib/reccapi.php')
    .query({
      resort: idmap[resort.id]
    }).end(function (err, res) {
      if (err) {
        debug('Failed query powder rating for:', resort.id, err.status);
        return fn(err.status);
      }
      debug('Powder rating in %s:', resort.id, res.text);
      res = JSON.parse(res.text)._source;
      if (!res || !res.powder || res.powder.rating === undefined
          || moment().diff(moment(res.createdOn, 'YYYY-MM-DD HH:mm:ss.SSS')) > day) {
        return fn();
      }
      fn(null, {
        id: res.resort,
        rating: res.powder.rating * 20
      });
    });
  });
}
