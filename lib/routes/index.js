var fs= require('fs');
var getData = require('./data');


var resorts = fs.readdirSync(__dirname + '/../resorts')
  .map( function (fname) {
    return fname.slice(0, -3);
  });

exports.index = function(req, res, next) {
  getData(req.query.resorts, resorts, function(err, resorts) {
    if(err) {
      return next(err);
    }
    res.render('index', {
      title: 'Liftie',
      resorts: resorts
    });
  });
};

exports.api = function(req, res, next) {
  getData(req.params.resort, resorts, function(err, resorts) {
    if(err) {
      return next(err);
    }
    if (resorts.length !== 1) {
     return res.send(500, 'Invalid resort name: ' + req.params.resort);
    }
    res.send(resorts[0]);
  });
};