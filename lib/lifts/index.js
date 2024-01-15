const debug = require('debug')('liftie:lifts');

const pipe = require('./pipe');
const rest = require('./rest');
const stats = require('./stats');
const getParseFn = require('./parse');

const interval = 60 * 1000; // once a minute - fetch status if there were requests
const longInterval = 30 * interval; // once every 30 minutes - fetch even if there wasn't any requests

module.exports = fetch;
module.exports.interval = {
  active: interval,
  inactive: longInterval
};

function getRequestFnAndUrl(resort) {
  if (resort.api) {
    return {
      fn: rest,
      url: resort.api
    };
  }
  if (resort.dataUrl) {
    return {
      fn: pipe,
      url: resort.dataUrl
    };
  }
  if (typeof (resort.getUrl) === 'function') {
    return {
      fn: pipe,
      url: resort.getUrl()
    };
  }
  return {
    fn: pipe,
    url: resort.url
  };
}

function fetch(resort, fn) {
  if (!resort._rfau) {
    resort._rfau = getRequestFnAndUrl(resort);
  }
  if (!resort._parseFn) {
    resort._parseFn = getParseFn(resort.id);
  }
  debug("Fetch lift status for %s", resort.id);
  const rfau = resort._rfau;
  rfau.fn(rfau.url, resort._parseFn, (_err, data) => {
    Promise.resolve(data).then((data, err) => {
      if (err || !data) {
        data = {};
      }
      fn(null, {
        status: data,
        stats: stats(data)
      });
    });
  });
}
