var resort = require('../resorts/alpine');
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
  getResortInfo(resort, function(err, info) {
    if(err) {
      return next(err);
    }
    res.render('index', {
      title: 'Liftie',
      resorts: [ info ]
    });
  });
};