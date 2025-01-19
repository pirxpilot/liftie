const connect = require('@pirxpilot/connect');
const cachifyStatic = require('connect-cachify-static');
const gzip = require('connect-gzip-static');
const http = require('node:http');
const path = require('node:path');
const loaders = require('./lib/loaders');
const plugins = require('./lib/plugins');

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const renderer = require('connect-renderer');

const app = module.exports = connect();

process.env.PORT ??= 3000;
process.env.SITE_URL ??= `http://localhost:${process.env.PORT}`;
process.env.NODE_ENV ??= 'development';

const root = path.join(__dirname, 'public');
const {
  SITE_URL: siteUrl,
  LIFTIE_STATIC_HOST: staticHost = ''
} = process.env;

const cachify = cachifyStatic(root);

app.locals = {
  min: '.min',
  decorateAbout() {},
  siteUrl,
  staticHost,
  serviceWorker: true,
  og: {
    image: `${staticHost || siteUrl}/img/snowflake-512.png`
  }
};

app.use(renderer(`${__dirname}/views`).engine('jade', {
  compile: require('@pirxpilot/jade-core').compile,
  options: { compileDebug: process.env.NODE_ENV !== 'production' }
}));

app.use(logger('dev'));
app.use(cookieParser());
app.use(cachify);
app.use(async (req, res, next) => {
  req.app = app;
  res.locals ??= {};
  const fns = await cachify.helpers();
  res.locals.cachify = fns.cachify;
  next();
});

app.use(gzip(root));

if (process.env.NODE_ENV === 'development') {
  app.locals.min = '';
  app.use(errorHandler());
}

app.loaders = loaders;
app.loaders.register(require('./lib/loader'));

app.plugins = plugins;
app.plugins.register('lifts', require('./lib/lifts'));
app.plugins.register('opening', require('./lib/opening'));
app.plugins.register('weather', require('./lib/weather'));
app.plugins.register('webcams', require('./lib/webcams'));

app.data = require('./lib/routes/data')();

require('./lib/routes')(app);

app.run = function run() {
  app.data.init(err => {
    if (err) {
      console.error(err);
      process.exit(1);
      return;
    }
    http.createServer(app).listen(process.env.PORT, () => {
      console.log(`Running on: http://localhost:${process.env.PORT}`);
    });
  });
};

if (!module.parent) {
  app.run();
}
