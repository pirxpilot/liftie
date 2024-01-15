const sorter = require('./sorter');
const canonical = require('./canonical');
const plan = require('./plan');
const serviceWorker = require('./service-worker');
const headers = require('./headers');

module.exports = routes;

function title(suffix) {
  let t = 'Liftie';
  if (suffix?.length) {
    t += ` | ${suffix}`;
  }
  return t;
}


function renderResorts(req, res, next) {
  const opts = req.opts || {};

  req.data.get(req.requested, (err, items) => {
    const template = opts.template || 'index';

    if (err) {
      return next(err);
    }
    if (opts.openSingle && items.length === 1) {
      items[0].open = true; // if single resort requested, always mark it as open
      res.locals.title = items[0].name;
      if (template !== 'widget') {
        res.locals.single = true;
      }
    } else {
      items = sorter(items, req.cookies);
    }
    res.locals.addToTrip = plan;

    res.render(template, {
      title: title(res.locals.title),
      all: req.data.all(),
      tags: req.data.tags(),
      resorts: items,
    });
  });
}

/**
 * Handles 2 types of URIs:
 *   / - display all resorts
 *   /resort/<name> - display a specific resort
 *   /?resorts=<name1>,<name2>... - display resorts on the list
 */
function index(req, _res, next) {
  req.requested = req.params.resort || req.query.resorts;
  req.opts = {
    openSingle: true
  };
  next();
}

/**
 * Display a single resort as a widget
 */
function widget(req, res, next) {
  const requested = req.params.resort;
  if (req.query.style === 'naked') {
    res.locals.widgetStyle = 'naked';
  }
  req.opts = {
    openSingle: true,
    template: 'widget'
  };
  req.requested = requested.split(',')[0]; // only one resort allowed
  next();
}

/**
 * Handles
 *   /stars - display starred subset of resorts
 */
function stars(req, res, next) {
  req.requested = req.cookies['resorts-starred'];
  res.locals.title = 'Stars';
  next();
}

/**
 * Handles /tag/<tag> URIs
 */
function tag(req, res, next) {
  res.locals.title = req.tag.label;
  next();
}

function about(_req, res) {
  res.render('about', {
    title: title('About')
  });
}

function sitemap(req, res) {
  res.contentType('application/xml');
  res.render('sitemap', {
    resorts: req.data.all(true)
  });
}

function absent(req, res, next) {
  req.requested = req.data.filtered((resort) => {
    const hasLists = resort.lifts?.status && Object.keys(resort.lifts.status).length;
    return !hasLists;
  });
  res.locals.title = 'Absent';
  next();
}

function confused(req, res, next) {
  req.requested = req.data.filtered((resort) => resort.opening && resort.lifts.stats && resort.lifts.stats.open);
  res.locals.title = 'Confused';
  next();
}

function closed(req, res, next) {
  req.requested = req.data.filtered((resort) => resort.opening);
  res.locals.title = 'Closed';
  next();
}

function stats(req, res) {
  const t = req.tag;
  res.render('stats', {
    title: title('Statistics'),
    sectionLink: t ? `/tag/${t.slug}` : '/',
    sectionTitle: t ? t.label : 'All Lifts',
    stats: req.data.stats(req.requested)
  });
}

function api(req, res, next) {
  req.data.get(req.params.resort, (err, resorts) => {
    if (err) {
      return next(err);
    }
    if (resorts.length !== 1) {
      return res.send(404, `Invalid resort name: ${req.params.resort}`);
    }
    // do not cache API responses
    res.header('Cache-Control', 'no-cache, max-age=0, must-revalidate');
    res.send(resorts[0]);
  });
}

function meta(req, res, next) {
  req.data.meta((err, resorts) => {
    if (err) {
      return next(err);
    }
    res.header('Cache-Control', 'public, max-age=86400'); // good for 24hours
    res.send(resorts);
  });
}

function routes(app) {

  function reqData(req, _res, next) {
    req.data = app.data;
    next();
  }

  app.param('tag', (req, res, next, t) => {
    const data = app.data;
    const tags = data.tags();
    const requested = tags[t]?.members;
    if (!requested) {
      t = canonical(t);
      if (tags[t]) {
        // permanent redirect to canonical form of the tag
        return res.redirect(301, `/tag/${t}`);
      }
      return res.send(404, `Invalid tag name: ${req.params.tag}`);
    }
    req.requested = requested;
    req.tag = tags[t];
    res.locals.tag = t;
    next();
  });

  app.get('/', reqData, headers, index, renderResorts);
  app.get('/resort/:resort', reqData, headers, index, renderResorts);
  app.get('/widget/resort/:resort', reqData, headers, widget, renderResorts);
  app.get('/tag/:tag', reqData, headers, tag, renderResorts);
  app.get('/stars', reqData, headers, stars, renderResorts);
  app.get('/api/resort/:resort', reqData, api);
  app.get('/api/meta', reqData, meta);
  app.get('/sitemap.xml', reqData, sitemap);
  app.get('/about', headers, about);
  app.get('/absent', reqData, headers, absent, renderResorts);
  app.get('/confused', reqData, headers, confused, renderResorts);
  app.get('/closed', reqData, headers, closed, renderResorts);
  app.get('/stats/:tag', reqData, headers, stats);
  app.get('/stats', reqData, headers, stats);
  app.get('/sw.js', serviceWorker);
}
