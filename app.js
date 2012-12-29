var express = require('express'),
  cachify = require('connect-cachify'),
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

var app = express();

app.configure(function(){
  app.locals.min = '.min';
  app.locals.cachify = cachify.cachify; // needed since our cachify middleware is below router
  app.locals.siteUrl = process.env.SITE_URL || 'http://liftie.info';
  app.locals.siteDescription = 'Clean, simple, easy to read, fast ski resort lift status.';
  app.locals.og= {
    image: app.locals.siteUrl + '/img/snowflake-256.png',
  };
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon(__dirname + '/public/favicon.ico'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(app.router);
  app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compileCss
  }));
  app.use(cachify.setup({}, {
    root: path.join(__dirname, 'public')
  }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.locals.min = '';
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/resort/:resort', routes.index);
app.get('/api/resort/:resort', routes.api);
app.get('/sitemap.xml', routes.sitemap);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
