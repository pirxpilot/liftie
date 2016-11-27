var express = require('express');
var cachify = require('connect-cachify-static');
var gzip = require('connect-gzip-static');
var http = require('http');
var path = require('path');
var loaders = require('./lib/loaders');
var plugins = require('./lib/plugins');

var favicon = require('serve-favicon');

var cookieParser = require('cookie-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');

var app = module.exports = express();


if (!process.env.SITE_URL) {
  process.env.SITE_URL =  (app.get('env') === 'production')
    ? 'https://liftie.info'
    : 'http://locahost:3000';
}

var root = path.join(__dirname, 'public');
var siteUrl = process.env.SITE_URL;

Object.assign(app.locals, {
  min: '.min',
  decorateAbout: function() {},
  siteUrl: siteUrl,
  serviceWorker: true,
  og: {
    image: siteUrl + '/img/snowflake-256.png'
  }
});
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(favicon(path.join(root, 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(cachify(root));

app.use(gzip(root));

if (app.get('env') === 'development') {
  app.locals.min = '';
  app.use(errorHandler());
}

app.loaders = loaders;
app.loaders.register(require('./lib/loader'));

app.plugins = plugins;
app.plugins.register('lifts', require('./lib/lifts'));
app.plugins.register('opening', require('./lib/opening'));
app.plugins.register('powder', require('./lib/powder'));
app.plugins.register('twitter', require('./lib/twitter'));
app.plugins.register('weather', require('./lib/weather'));
app.plugins.register('webcams', require('./lib/webcams'));

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
