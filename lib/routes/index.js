var async = require('async');
var stats = require('../stats');
var pipe = require('../pipe');

function getResortInfo(resort, fn) {
  pipe(resort.url, resort.parse, function(err, status) {
    fn(err, {
      name: resort.name,
      href: resort.url.host + resort.url.pathname,
      status: status,
      stats: stats(status)
    });
  });
}

exports.index = function(req, res, next) {
  async.map(['alpine', 'squaw'], function(item, fn) {
    var resort = require('../resorts/' + item);
    getResortInfo(resort, fn);
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