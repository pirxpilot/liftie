var async = require('async');
var AsyncCache = require('async-cache');
var stats = require('../stats');
var pipe = require('../pipe');

var resorts = ['alpine', 'squaw', 'heavenly'];

var cache = new AsyncCache({
  max: resorts.length,
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

function getResortList(q) {
  if(!q.resorts) {
    return resorts;
  }
  return q.resorts.split(',').filter(function(r) {
    return resorts.indexOf(r) >= 0;
  });
}

exports.index = function(req, res, next) {
  async.map(getResortList(req.query), function(item, fn) {
    cache.get(item, fn);
  }, function(err, resorts) {
    if(err) {
      return next(err);
    }
    res.render('index', {
      title: 'Liftie',
      resorts: resorts
    });
  });
};