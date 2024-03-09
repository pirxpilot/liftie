const esbuild = require('esbuild');
const fs = require('node:fs');

module.exports = renderServiceWorker;

const {
  NODE_ENV,
  SITE_URL: siteUrl,
  LIFTIE_STATIC_HOST: staticHost = ''
} = process.env;

const DEBUG = NODE_ENV !== 'production';

function renderServiceWorker(_req, res) {
  createServiceWorkerScript(res.locals).then(serviceWorkerScript => {
    // do not cache service worker
    res.header('Cache-Control', 'no-cache, max-age=0, must-revalidate');
    res.header('Content-Type', 'text/javascript');
    res.write(serviceWorkerScript);
    res.end();
  });
}

function fixName(filename) {
  if (DEBUG) {
    return filename;
  }
  return filename
    .replace(/.css$/, '.min.css')
    .replace(/.js$/, '.min.js');
}

async function minify({ debug, vars, script }) {
  const options = {
    target: ['es2018'],
    format: 'esm',
    define: {
      DEBUG: debug.toString()
    }
  };
  if (!debug) {
    Object.assign(options, {
      drop: ['console'],
      minify: true
    });
  }
  const { code } = await esbuild.transform([vars, script].join('\n'), options);
  return code;
}

let serviceWorkerScriptPromise;

function createServiceWorkerScript({ cachify }) {
  if (!serviceWorkerScriptPromise) {
    const serviceWorkerOptions = {
      version: require('../../package.json').version,
      prefetch: [
          '/img/noaa-logo.svg',
          '/scripts/liftie.js',
          '/stylesheets/style.css',
          '/stylesheets/fonts/lift-status.woff2',
          '/stylesheets/fonts/iconvault_forecastfont.woff2'
        ]
        .map(fixName)
        .map(f => staticHost + cachify(f)),
      liftieHost: siteUrl,
      staticHost
    };
    serviceWorkerScriptPromise = minify({
      debug: DEBUG,
      vars: `var options = ${JSON.stringify(serviceWorkerOptions)};`,
      script: fs.readFileSync(`${__dirname}/sw.template.js`, 'utf-8')
    });
  }
  return serviceWorkerScriptPromise;
}
