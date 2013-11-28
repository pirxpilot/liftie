var pipe = require('./pipe');
var rest = require('./rest');
var stats = require('./stats');
var debug = require('debug')('liftie:lifts');

var interval = 60 * 1000; // once a minute - fetch status if there were requests
var longInterval = 30 * interval; // once every 30 minutes - fetch even if there wasn't any requests

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

/**
 * catch exceptions thrown by parse
 */
function getParseFn(resort) {
  return function() {
    var parse = require('../resorts/' + resort.id);
    try {
      return parse.apply(null, arguments);
    } catch(e) {
      console.error('Exception when parsing ' + resort.id, e);
      return {};
    }
  };
}

function fetch(resort, fn) {
  var rfau = getRequestFnAndUrl(resort);
  debug("Fetch lift status for %s", resort.id);
  rfau.fn(rfau.url, getParseFn(resort), function(err, data) {
    if (err || !data) {
      data = {};
    }
    fn(null, {
      status: data,
      stats: stats(data)
    });
  });
}
