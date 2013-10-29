var debug = require('debug')('liftie:data');
var checkNames = require('../checker');
var database = require('./database');

module.exports = data;

/*global setInterval */

var plugins = {
  lifts: require('../lifts')
};


function forEachPlugin(fn) {
  Object.keys(plugins).forEach(fn);
}


// data structure
function data(resorts) {

  var cache = {}, // meta and data for each resort
    db = database(cache, forEachPlugin);

  function fetchStatus(plugin, meta, data) {
    debug('Fetch: %s for %s', plugin, meta.id);
    var fetch = plugins[plugin];
    meta.fetchInProgress[plugin] = true;
    fetch(meta, function(err, response) {
      meta.fetchInProgress[plugin] = false;
      meta.counter = 0;
      if (err) {
        // don't update data on error
        console.error('Errors when fetching status for:', data.id, err);
        return;
      }
      data.timestamp[plugin] = Date.now();
      data[plugin] = response;
      db.write(meta.id);
    });
  }

  function fetchStatusAll() {
    var now = Date.now();
    Object.keys(cache).forEach(function(id) {
      var resort = cache[id],
        data = resort.data,
        meta = resort.meta;
      forEachPlugin(function(plugin) {
        var sinceLastFetch = now - data.timestamp[plugin],
          interval = plugins[plugin].interval;
        if (meta.fetchInProgress[plugin]) {
          debug("Fetch in progress: %s for %s", plugin, id);
          return;
        }
        if (sinceLastFetch > interval.inactive
          || (resort.meta.counter > 0 && sinceLastFetch > interval.active)) {
          // fetch only if it's been really long time, or if it was sufficienly long time and
          // someone is interested in the latest status
          fetchStatus(plugin, meta, data);
        }
      });
    });
  }

  function readCache() {
    Object.keys(cache).forEach(db.read);
  }

  function init() {
    resorts.names.forEach(function(id) {
      var info, resort;
      resort = resorts.data[id];
      info = {
        meta: resort,
        data: {
          id: id,
          name: resort.name,
          href: resort.url.host + resort.url.pathname,
          opening: resort.opening,
          ll: resort.ll
        }
      };

      info.meta.counter = 0;
      info.meta.id = id;
      info.meta.fetchInProgress = {};
      info.data.timestamp = {};
      forEachPlugin(function(plugin) {
        info.meta.fetchInProgress[plugin] = false;
        info.data.timestamp[plugin] = 0;
      });
      cache[id] = info;
    });
  }

  function prefetch() {
    db.onload(function(count) {
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