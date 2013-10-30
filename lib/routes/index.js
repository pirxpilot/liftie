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

function routes(app) {
  var data = app.data;

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
        all: data.all(),
        resorts: items,
        tags: data.tags()
      });
    };
  }

  /**
   * Handles 2 types of URIs:
   *   / - display all resorts
   *   /resort/<name> - display a specific resort
   *   /?resorts=<name1>,<name2>... - display resorts on the list
   */
  function index(req, res, next) {
    var requested = req.params.resort || req.query.resorts;
    data.get(requested, renderResortsFn(req, res, next, {
      openSingle: true
    }));
  }

  /**
   * Display a single resort as a widget
   */
  function widget(req, res, next) {
    var requested = req.params.resort;
    requested = requested.split(',')[0]; // only one resort allowed
    data.get(requested, renderResortsFn(req, res, next, {
      openSingle: true,
      template: 'widget'
    }));
  }

  /**
   * Handles
   *   /stars - display starred subset of resorts
   */
  function stars(req, res, next) {
    var requested = req.cookies['resorts-starred'];
    data.get(requested, renderResortsFn(req, res, next, {
      title: 'Stars'
    }));
  }

  /**
   * Handles /tag/<tag> URIs
   */
  function tag(req, res, next) {
    var tags = data.tags(),
      t = req.params.tag,
      requested = tags[t] && tags[t].members;
    if(!requested) {
      t = canonical(t);
      if(tags[t]) {
        // permanent redirect to canonical form of the tag
        return res.redirect(301, '/tag/' + t);
      }
      return res.send(404, 'Invalid tag name: ' + req.params.tag);
    } else {
      data.get(requested, renderResortsFn(req, res, next, {
        title: tags[t].label
      }));
    }
  }

  function api(req, res, next) {
    data.get(req.params.resort, function(err, resorts) {
      if(err) {
        return next(err);
      }
      if(resorts.length !== 1) {
        return res.send(404, 'Invalid resort name: ' + req.params.resort);
      }
      res.send(resorts[0]);
    });
  }

  function sitemap(req, res) {
    res.contentType('application/xml');
    res.render('sitemap', {
      resorts: data.all(true)
    });
  }

  function about(req, res) {
    res.render('about', {
      title: title('About')
    });
  }

  function absent(req, res, next) {
    data.get(data.absent(), renderResortsFn(req, res, next, {
      title: 'Absent'
    }));
  }

  app.get('/', index);
  app.get('/resort/:resort', index);
  app.get('/widget/resort/:resort', widget);
  app.get('/tag/:tag', tag);
  app.get('/stars', stars);
  app.get('/api/resort/:resort', api);
  app.get('/sitemap.xml', sitemap);
  app.get('/about', about);
  app.get('/absent', absent);
}