var fs= require('fs');
var getData = require('./data');
var sorter = require('./sorter');


var resorts = fs.readdirSync(__dirname + '/../resorts')
  .map( function (fname) {
    return fname.slice(0, -3);
  });

/**
 * Handles 2 types of URIs:
 *   / - display all resorts
 *   /resort/<name> - display a specific resort
 *   /?resorts=<name1>,<name2>... - display resorts on the list
 */
exports.index = function(req, res, next) {
  var requested = req.params.resort || req.query.resorts;
  getData(requested, resorts, function(err, resorts) {
    if(err) {
      return next(err);
    }
    if (resorts.length === 1) {
      resorts[0].open = true; // if single resort requested, always mark it as open
    } else {
      resorts = sorter(resorts, req.cookies);
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

exports.sitemap = function(req, res) {
  res.contentType('application/xml');
  res.render('sitemap', {
    resorts: resorts
  });
};