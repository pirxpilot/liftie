var debug = require('debug')('liftie:data');
var stats = require('../stats');
var pipe = require('../pipe');
var rest = require('../rest');
var checkNames = require('../checker');

module.exports = data;

/*global setInterval */

var interval = 60 * 1000; // once a minute - fetch status if there were requests
var longInterval = 30 * interval; // once every 30 minutes - fetch even if there wasn't any requests

function data(resortNames, fnLoad) {

  // data for each resort
  var cache = {};

  function fetchStatus(meta, data) {
    var requestFn = meta.api ? rest : pipe;
    debug("Fetch lift status for %s", data.id);
    meta.fetchInProgess = true;
    requestFn(meta.api || meta.dataUrl || meta.url, meta.parse, function(err, status) {
      if (err) {
        // don't update data on error
        console.error('Errors when fetching status for:', data.id, err);
        return;
      }
      meta.fetchInProgess = false;
      meta.counter = 0;
      data.timestamp = Date.now();
      data.status = status;
      data.stats = stats(status);
    });
  }

  function fetchStatusAll() {
    var now = Date.now();
    Object.keys(cache).forEach(function(id) {
      var resort = cache[id], sinceLastFetch = now - resort.data.timestamp;
      if (resort.meta.fetchInProgess) {
        return;
      }
      if (sinceLastFetch > longInterval
        || (sinceLastFetch > interval && resort.meta.counter > 0)) {
        // fetch only if it's been really long time, or if it was sufficienly long time and
        // someone is interested in the latest status
        fetchStatus(resort.meta, resort.data);
      }
    });
  }

  function init() {
    resortNames.forEach(function(id) {
      var resort = fnLoad(id);
      cache[id] = {
        meta: {
          fetchInProgess: false,
          requestCounter: 0,
          parse: resort.parse,
          api: resort.api,
          url: resort.url,
          dataUrl: resort.dataUrl
        },
        data: {
          id: id,
          name: resort.name,
          href: resort.url.host + resort.url.pathname,
          timestamp: 0,
          status: {},
          stats: stats({})
        }
      };
    });
  }

  function prefetch() {
    fetchStatusAll();
    setInterval(fetchStatusAll, 10 * 1000); // wake 6 times per minute
  }

  function getData(requestedNames, fn) {
    var names, result;
    names = checkNames(requestedNames, resortNames),
    result = names.map(function(id) {
      var resort = cache[id];
      resort.meta.counter += 1;
      return resort.data;
    });
    process.nextTick(function() {
      fn(null, result);
    });
  }

  init();
  prefetch();

  return {
    get: getData
  };
}