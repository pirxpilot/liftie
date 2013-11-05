var express = require('express');
var cachify = require('connect-cachify-static');
var gzip = require('connect-gzip-static');
var http = require('http');
var path = require('path');
var stylus = require('stylus');
var nib = require('nib');
var loaders = require('./lib/loaders');
var plugins = require('./lib/plugins');

function compileCss(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true)
    .use(nib());
}

var app = module.exports = express();

app.configure(function() {
  var root = path.join(__dirname, 'public'),
    siteUrl = process.env.SITE_URL || 'http://liftie.info';
  app.locals({
    min: '.min',
    decorateAbout: function() {},
    siteUrl: siteUrl,
    og: {
      image: siteUrl + '/img/snowflake-256.png'
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

app.loaders = loaders;
app.loaders.register(require('./lib/loader'));

app.plugins = plugins;
app.plugins.register('lifts', require('./lib/lifts'));
app.plugins.register('opening', require('./lib/opening'));
app.plugins.register('weather', require('./lib/weather'));

app.data = require('./lib/routes/data')();

require('./lib/routes')(app);

app.run = function run() {
  app.data.init(function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
      return;
    }
    http.createServer(app).listen(app.get('port'), function(){
      console.log("Running on: " + "http://localhost:" + app.get('port'));
    });
  });
};

if (!module.parent) {
  app.run();
}
