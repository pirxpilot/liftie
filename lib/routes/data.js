var async = require('async');
var AsyncCache = require('async-cache');
var stats = require('../stats');
var pipe = require('../pipe');
var checkNames = require('../checker');

module.exports = data;

/*global setInterval */

var interval = 60 * 1000; // once a minute


function getResortInfo(item, fn) {
  var resort = require('../resorts/' + item);
  pipe(resort.url, resort.parse, function(err, status) {
    if (err) {
      // for now just log the error, and return empty data
      console.log(err);
      err = null;
      status = {};
    }
    fn(null, {
      id: item,
      name: resort.name,
      href: resort.url.host + resort.url.pathname,
      status: status,
      stats: stats(status)
    });
  });
}

function data(resortNames) {

  var cache = new AsyncCache({
    max: resortNames.length + 1, // bigger than the number of resorts we support
    maxAge: interval,
    load: getResortInfo
  });

  function fetch(fn) {
    async.forEach(resortNames, function(item, fn) {
      getResortInfo(item, function(err, resort) {
        // only seed the cache if we actually got some data
        if (Object.keys(resort.status).length > 0) {
          cache.set(item, resort);
        }
        fn();
      });
    }, fn);
  }

  function prefetch() {
    fetch(function() {
      setInterval(fetch, interval + 500);
    });
  }

  function getData(requestedNames, fn) {
    var names = checkNames(requestedNames, resortNames);
    async.map(names, function(item, fn) {
      cache.get(item, fn);
    }, fn);
  }

  prefetch();

  return {
    get: getData
  };
}