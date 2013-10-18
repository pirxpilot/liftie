var express = require('express'),
  cachify = require('connect-cachify-static'),
  gzip = require('connect-gzip-static'),
  http = require('http'),
  path = require('path'),
  stylus = require('stylus'),
  nib = require('nib'),
  routes = require('./lib/routes');

function compileCss(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true)
    .use(nib());
}

var app = module.exports = express();

app.configure(function() {
  var root = path.join(__dirname, 'public');
  app.locals({
    min: '.min',
    decorateResort: function() {},
    decorateAbout: function() {},
    siteUrl: process.env.SITE_URL || 'http://liftie.info',
    siteDescription: 'Clean, simple, easy to read, fast ski resort lift status.',
    og: {
      image: app.locals.siteUrl + '/img/snowflake-256.png',
    }
  });
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  app.use(express.favicon(path.join(root, 'favicon.ico')));
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(cachify(root));
  app.use(app.router);
  app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compileCss
  }));
  app.use(gzip(root));
});

app.configure('development', function(){
  app.locals.min = '';
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/resort/:resort', routes.index);
app.get('/tag/:tag', routes.tag);
app.get('/stars', routes.stars);
app.get('/api/resort/:resort', routes.api);
app.get('/sitemap.xml', routes.sitemap);
app.get('/about', routes.about);

if (!module.parent) {
  http.createServer(app).listen(app.get('port'), function(){
    console.log("Running on: " + "http://localhost:" + app.get('port'));
  });
}
