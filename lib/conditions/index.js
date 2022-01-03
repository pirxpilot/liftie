var debug = require('debug')('liftie:conditions');

var pipe = require('./pipe');
var rest = require('./rest');
var getParseFn = require('./parse');

var interval = 60 * 1000; // once a minute - fetch status if there were requests
var longInterval = 30 * interval; // once every 30 minutes - fetch even if there wasn't any requests

module.exports = fetch;
module.exports.interval = {
  active: interval,
  inactive: longInterval
};

function getRequestFnAndUrl(resort) {
  if (typeof (resort.getConditionsUrl) === 'function') {
    return {
      fn: pipe,
      url: resort.getConditionsUrl()
    };
  }
  return {
    fn: pipe,
    url: resort.conditions
  };
}

function fetch(resort, fn) {
  if (!resort._rfau) {
    resort._rfau = getRequestFnAndUrl(resort);
  }
  if (!resort._parseFn) {
    resort._parseFn = getParseFn(resort.id);
  }
  debug("Fetch conditions for %s", resort.id);
  var rfau = resort._rfau;
  rfau.fn(rfau.conditionsUrl, resort._parseFn, function(err, data) {
    Promise.resolve(data).then(function(data, err) {
      if (err || !data) {
        data = {};
      }
      fn(null, {
        status: data,
      });
    });
  });
}
