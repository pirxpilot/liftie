// http://www.skialpine.com/mountain/snow-report


var resort = require('../resorts/alpine');
var pipe = require('../pipe');

function getResortInfo(resort, fn) {
  pipe(resort.url, resort.parse, function(err, status) {
    fn(err, {
      name: resort.name,
      href: resort.url.host + resort.url.pathname,
      status: status
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