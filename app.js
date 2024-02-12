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

process.env.PORT ??= 3000;
process.env.SITE_URL ??= `http://localhost:${process.env.PORT}`;
process.env.NODE_ENV ??= 'development';

const root = path.join(path.dirname(new URL(import.meta.url).pathname), 'public');
const { SITE_URL: siteUrl, LIFTIE_STATIC_HOST: staticHost = '' } = process.env;

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
  renderer(`${path.dirname(new URL(import.meta.url).pathname)}/views`).engine('jade', {
    compile,
    options: { compileDebug: process.env.NODE_ENV !== 'production' }
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

if (process.env.NODE_ENV === 'development') {
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
    http.createServer(app).listen(process.env.PORT, () => {
      console.log(`Running on: http://localhost:${process.env.PORT}`);
    });
  });
};

if (import.meta.main) {
  app.run();
}
