var sorter = require('./sorter');
var canonical = require('./canonical');

module.exports = routes;

function title(suffix) {
  var t = 'Liftie';
  if(suffix && suffix.length) {
    t += ' | ' + suffix;
  }
  return t;
}

function routes(resorts) {
  var data, tags, exports = {};

  data = require('./data')(resorts),
  tags = require('./tags')(resorts);

  function renderResortsFn(req, res, next, opts) {
    return function(err, items) {
      var titleSuffix = opts.title,
        template = opts.template || 'index';

      if(err) {
        return next(err);
      }
      if(opts.openSingle && items.length === 1) {
        items[0].open = true; // if single resort requested, always mark it as open
        titleSuffix = titleSuffix || items[0].name;
      } else {
        items = sorter(items, req.cookies);
      }

      res.render(template, {
        title: title(titleSuffix),
        all: resorts.names,
        resorts: items,
        tags: tags
      });
    };
  }

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
   * Display a single resort as a widget
   */
  exports.widget = function(req, res, next) {
    var requested = req.params.resort;
    requested = requested.split(',')[0]; // only one resort allowed
    data.get(requested, renderResortsFn(req, res, next, {
      openSingle: true,
      template: 'widget'
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
      resorts: Object.keys(resorts.data)
    });
  };

  exports.about = function(req, res) {
    res.render('about', {
      title: title('About')
    });
  };
  return exports;
}