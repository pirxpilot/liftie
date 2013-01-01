var fs = require('fs');
var sorter = require('./sorter');

var resorts = fs.readdirSync(__dirname + '/../resorts')
  .map(function(fname) {
    return fname.slice(0, -3);
  });

function loadResort(item) {
  var resort = require('../resorts/' + item);
  resort.id = item;
  return resort;
}

var data = require('./data')(resorts, loadResort);
var tags = require('./tags')(resorts, loadResort);

/**
 * Handles 2 types of URIs:
 *   / - display all resorts
 *   /resort/<name> - display a specific resort
 *   /?resorts=<name1>,<name2>... - display resorts on the list
 */
exports.index = function(req, res, next) {
  var requested = req.params.resort || req.query.resorts;
  data.get(requested, function(err, resorts) {
    if(err) {
      return next(err);
    }
    if(resorts.length === 1) {
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


/**
 * Handles /tag/<tag> URIs
 */
exports.tag = function(req, res, next) {
  var requested = tags[req.params.tag];
  if(!requested) {
    return res.send(404, 'Invalid resort name: ' + req.params.tag);
  } else {
    data.get(requested, function(err, resorts) {
      if(err) {
        return next(err);
      }
      resorts = sorter(resorts, req.cookies);
      res.render('index', {
        title: 'Liftie',
        resorts: resorts
      });
    });
  }
};

exports.api = function(req, res, next) {
  data.get(req.params.resort, function(err, resorts) {
    if(err) {
      return next(err);
    }
    if(resorts.length !== 1) {
      return res.send(404, 'Invalid resort name: ' + req.params.resort);
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