const express = require('express');
const cachify = require('connect-cachify-static');
const gzip = require('connect-gzip-static');
const http = require('http');
const path = require('path');
const loaders = require('./lib/loaders');
const plugins = require('./lib/plugins');

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const errorHandler = require('errorhandler');

const app = module.exports = express();


if (!process.env.SITE_URL) {
  process.env.SITE_URL =  (app.get('env') === 'production') ?
    'https://liftie.info' :
    'http://locahost:3000';
}

const root = path.join(__dirname, 'public');
const {
  SITE_URL: siteUrl,
  LIFTIE_STATIC_HOST: staticHost = ''
} = process.env;

Object.assign(app.locals, {
  min: '.min',
  decorateAbout() {},
  siteUrl,
  staticHost,
  serviceWorker: true,
  og: {
    image: `${staticHost || siteUrl}/img/snowflake-512.png`
  }
});
app.set('port', process.env.PORT || 3000);
app.set('views', `${__dirname}/views`);
app.engine('jade', require('@pirxpilot/jade-core').__express);
app.set('view engine', 'jade');

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
      console.log(`Running on: http://localhost:${app.get('port')}`);
    });
  });
};

if (!module.parent) {
  app.run();
}
