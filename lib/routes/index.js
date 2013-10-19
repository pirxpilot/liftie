var fs = require('fs');
var sorter = require('./sorter');
var canonical = require('./canonical');

var resorts = fs.readdirSync(__dirname + '/../resorts');

function loadResort(item) {
  var dir = '../resorts/' + item,
    parse = require(dir),
    resort = require(dir + '/resort.json');

  resort.id = item;
  resort.parse = parse;
  return resort;
}


function title(suffix) {
  var t = 'Liftie';
  if(suffix && suffix.length) {
    t += ' | ' + suffix;
  }
  return t;
}


function renderResortsFn(req, res, next, opts) {
  return function(err, items) {
    var titleSuffix = opts.title;
    if(err) {
      return next(err);
    }
    if(opts.openSingle && items.length === 1) {
      items[0].open = true; // if single resort requested, always mark it as open
      titleSuffix = titleSuffix || items[0].name;
    } else {
      items = sorter(items, req.cookies);
    }

    res.render('index', {
      title: title(titleSuffix),
      all: resorts,
      resorts: items,
      tags: tags
    });
  };
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
  data.get(requested, renderResortsFn(req, res, next, {
    openSingle: true
  }));
};


/**
 * Handles
 *   /stars - display starred subset of resorts
 */
exports.stars = function(req, res, next) {
  var requested = req.cookies['resorts-starred'];
  data.get(requested, renderResortsFn(req, res, next, {
    title: 'Stars'
  }));
};


/**
 * Handles /tag/<tag> URIs
 */
exports.tag = function(req, res, next) {
  var tag = req.params.tag,
    requested = tags[tag] && tags[tag].members;
  if(!requested) {
    tag = canonical(tag);
    if(tags[tag]) {
      // permanent redirect to canonical form of the tag
      return res.redirect(301, '/tag/' + tag);
    }
    return res.send(404, 'Invalid tag name: ' + req.params.tag);
  } else {
    data.get(requested, renderResortsFn(req, res, next, {
      title: tags[tag].label
    }));
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

exports.about = function(req, res) {
  res.render('about', {
    title: title('About')
  });
};