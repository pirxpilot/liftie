import http from 'node:http';
import path from 'node:path';
import connect from '@pirxpilot/connect';
import cookieParser from '@pirxpilot/cookie-parser';
import { compile } from '@pirxpilot/jade-core';
import cachifyStatic from 'connect-cachify-static';
import gzip from 'connect-gzip-static';
import renderer from 'connect-renderer';
import errorHandler from 'errorhandler';
import logger from 'morgan';
import { NODE_ENV, PORT, SITE_URL as siteUrl, LIFTIE_STATIC_HOST as staticHost } from './lib/env.js';
import lifts from './lib/lifts/index.js';
import loader from './lib/loader.js';
import * as loaders from './lib/loaders.js';
import opening from './lib/opening.js';
import * as plugins from './lib/plugins.js';
import dataRoutes from './lib/routes/data.js';
import routes from './lib/routes/index.js';
import weather from './lib/weather/index.js';
import webcams from './lib/webcams.js';

const app = connect();
export default app;

const root = path.resolve(import.meta.dirname, 'public');
const views = path.resolve(import.meta.dirname, 'views');

const cachify = cachifyStatic(root, { format: 'name' });

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

app.use(
  renderer(views).engine('jade', {
    compile,
    options: { compileDebug: NODE_ENV !== 'production' }
  })
);

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

if (NODE_ENV === 'development') {
  app.locals.min = '';
  app.use(errorHandler());
}

app.loaders = loaders;
app.loaders.register(loader);

app.plugins = plugins;
app.plugins.register('lifts', lifts);
app.plugins.register('opening', opening);
app.plugins.register('weather', weather);
app.plugins.register('webcams', webcams);

app.data = dataRoutes();

routes(app);

app.run = function run() {
  app.data.init(err => {
    if (err) {
      console.error(err);
      process.exit(1);
      return;
    }
    http.createServer(app).listen(PORT, () => {
      console.log(`Running on: http://localhost:${PORT}`);
    });
  });
};

if (import.meta.main) {
  app.run();
}
