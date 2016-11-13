var uglify = require('uglify-js');
var cachify = require('connect-cachify-static');
var fs = require('fs');

module.exports = renderServiceWorker;

var DEBUG = process.env.NODE_ENV !== 'production';

function fixName(filename) {
  if (DEBUG) {
    return filename;
  }
  return filename
    .replace(/.css$/, '.min.css')
    .replace(/.js$/, '.min.js');
}

function cachifyName(filename) {
  return cachify.cachify(filename);
}

function minify(opts) {
  var options = {
    fromString: true,
    compress: {
      drop_console: true
    }
  };
  if (opts.debug) {
    options.compress = false;
    options.mangle = false;
    options.output = {
      beautify: true
    };
  }
  return uglify.minify([
    opts.vars,
    opts.script,
  ], options).code;
}

var serviceWorkerOptions = {
  version: require('../../package.json').version,
  prefetch: [
    '/scripts/liftie.js',
    '/stylesheets/style.css',
    '/stylesheets/fonts/lift-status.woff',
    '/stylesheets/fonts/iconvault_forecastfont.woff'
  ]
    .map(fixName)
    .map(cachifyName),
  liftieHost: process.env.SITE_URL
};

var serviceWorkerScript = minify({
  debug: DEBUG,
  vars: 'var options = ' + JSON.stringify(serviceWorkerOptions) + ';',
  script: fs.readFileSync(__dirname + '/sw.template.js', 'utf-8')
});


function renderServiceWorker(req, res) {
  // do not cache service worker
  res.header('Cache-Control', 'no-cache, max-age=0, must-revalidate');
  res.header('Content-Type', 'text/javascript');
  res.write(serviceWorkerScript);
  res.end();
}
