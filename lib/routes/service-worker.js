const terser = require('terser');
const cachify = require('connect-cachify-static');
const fs = require('fs');

module.exports = renderServiceWorker;


const {
  NODE_ENV,
  SITE_URL: siteUrl,
  LIFTIE_STATIC_HOST: staticHost = ''
} = process.env;

const DEBUG = NODE_ENV !== 'production';

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
    compress: {
      drop_console: true
    }
  };
  if (debug) {
    options.compress = false;
    options.mangle = false;
    options.output = {
      beautify: true
    };
  }
  const { code } = await terser.minify([vars, script], options);
  return code;
}

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
    .map(f => staticHost + cachify.cachify(f)),
  liftieHost: siteUrl,
  staticHost
};

const serviceWorkerScriptPromise = minify({
  debug: DEBUG,
  vars: `var options = ${JSON.stringify(serviceWorkerOptions)};`,
  script: fs.readFileSync(`${__dirname}/sw.template.js`, 'utf-8')
});

function renderServiceWorker(req, res) {
  serviceWorkerScriptPromise.then(serviceWorkerScript => {
    // do not cache service worker
    res.header('Cache-Control', 'no-cache, max-age=0, must-revalidate');
    res.header('Content-Type', 'text/javascript');
    res.write(serviceWorkerScript);
    res.end();
  });
}
