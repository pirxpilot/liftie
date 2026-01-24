import fs from 'node:fs';
import esbuild from 'esbuild';
import packageJSON from '../../package.json' with { type: 'json' };
import { NODE_ENV, SITE_URL as siteUrl, LIFTIE_STATIC_HOST as staticHost } from '../env.js';

const DEBUG = NODE_ENV !== 'production';

export default function renderServiceWorker(_req, res) {
  createServiceWorkerScript(res.locals).then(serviceWorkerScript => {
    // do not cache service worker
    res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate');
    res.setHeader('Content-Type', 'text/javascript');
    res.write(serviceWorkerScript);
    res.end();
  });
}

function fixName(filename) {
  if (DEBUG) {
    return filename;
  }
  return filename.replace(/.css$/, '.min.css').replace(/.js$/, '.min.js');
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
      version: packageJSON.version,
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
      script: fs.readFileSync(`${import.meta.dirname}/sw.template.js`, 'utf-8')
    });
  }
  return serviceWorkerScriptPromise;
}
