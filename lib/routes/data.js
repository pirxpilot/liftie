var debug = require('debug')('liftie:data');
var dirty = require('dirty');
var path = require('path');
var stats = require('../stats');
var pipe = require('../pipe');
var rest = require('../rest');
var checkNames = require('../checker');

module.exports = data;

/*global setInterval */

var interval = 60 * 1000; // once a minute - fetch status if there were requests
var longInterval = 30 * interval; // once every 30 minutes - fetch even if there wasn't any requests
var dbFileName = path.resolve(process.env.LOG_DIR || require('os').tmpDir(), 'liftie.db');

function data(resorts) {

  var cache = {}, // meta data and status for each resort
    db = dirty(dbFileName); // persistent status for each resort

  function getRequestFnAndUrl(meta) {
    if (meta.api) {
      return {
        fn: rest,
        url: meta.api
      };
    }
    if (meta.dataUrl) {
      return {
        fn: pipe,
        url: meta.dataUrl
      };
    }
    if (typeof (meta.getUrl) === 'function') {
      return {
        fn: pipe,
        url: meta.getUrl()
      };
    }
    return {
      fn: pipe,
      url: meta.url
    };
  }

  /**
   * catch exceptions thrown by parse
   */
  function getParseFn(meta, data) {
    return function() {
      try {
        return meta.parse.apply(null, arguments);
      } catch(e) {
        console.error('Exception when parsing ' + data.id, e);
        return {};
      }
    };
  }

  function fetchStatus(meta, data) {
    var rfau = getRequestFnAndUrl(meta);
    debug("Fetch lift status for %s", data.id);
    meta.fetchInProgess = true;
    rfau.fn(rfau.url, getParseFn(meta, data), function(err, status) {
      meta.fetchInProgess = false;
      meta.counter = 0;
      data.timestamp = Date.now();
      if (err) {
        // don't update data on error
        console.error('Errors when fetching status for:', data.id, err);
        return;
      }
      data.status = status;
      data.stats = stats(status);
      db.set(data.id, {
        timestamp: data.timestamp,
        status: data.status,
        stats: data.stats
      });
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

  function readCache() {
    Object.keys(cache).forEach(function(id) {
      var data = db.get(id);
      if (data) {
        debug('Found cached data for ', id);
        cache[id].data.timestamp = data.timestamp;
        cache[id].data.status = data.status;
        cache[id].data.stats = data.stats;
      }
    });
  }

  function init() {
    resorts.names.forEach(function (id) {
      var resort = resorts.data[id];
      resort.timestamp = 0;
      resort.status = {};
      resort.stats = stats({});
      cache[id] = {
        meta: {
          fetchInProgess: false,
          counter: 0,
          parse: resort.parse,
          api: resort.api,
          url: resort.url,
          getUrl: resort.getUrl,
          dataUrl: resort.dataUrl
        },
        data: resort
      };
    });
  }

  function prefetch() {
    db.on('load', function(count) {
      debug('Found %d resorts in cache', count);
      readCache();
      fetchStatusAll();
      setInterval(fetchStatusAll, 10 * 1000); // wake 6 times per minute
    });
  }

  function getData(requestedNames, fn) {
    var names, result;
    names = checkNames(requestedNames, resorts.data, resorts.names);
    result = names.map(function(id) {
      var resort = cache[id];
      if (resort) {
        resort.meta.counter += 1;
        return resort.data;
      }
      return resorts.data[id];
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