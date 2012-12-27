var async = require('async');
var AsyncCache = require('async-cache');
var stats = require('../stats');
var pipe = require('../pipe');
var checkNames = require('../checker');

module.exports = getData;

var cache = new AsyncCache({
  max: 100, // should be bigger than number of resorts we support
  maxAge: 60 * 1000, // once a minute
  load: getResortInfo
});

function getResortInfo(item, fn) {
  var resort = require('../resorts/' + item);
  pipe(resort.url, resort.parse, function(err, status) {
    fn(err, {
      name: resort.name,
      href: resort.url.host + resort.url.pathname,
      status: status,
      stats: stats(status)
    });
  });
}

function getData(requestedNames, validNames, fn) {
  var resortNames = checkNames(requestedNames, validNames);
  async.map(resortNames, function(item, fn) {
    cache.get(item, fn);
  }, fn);
}