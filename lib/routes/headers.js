import crypto from 'node:crypto';
import { CSP_REPORT_URI, LIFTIE_CSP_ENFORCE, LIFTIE_STATIC_HOST as staticHost } from '../env.js';

export default [csp, referrer, feature, link];

const scriptHost = staticHost ? staticHost : `'self'`;

const CSP_HEADER_NAME = toBoolean(LIFTIE_CSP_ENFORCE)
  ? 'Content-Security-Policy'
  : 'Content-Security-Policy-Report-Only';

const cspPolicy = [
  `base-uri 'self'`,
  `object-src 'none'`,
  `worker-src 'self'`,
  `script-src 'nonce-$random' 'strict-dynamic' ${scriptHost}`,
  'report-to csp'
].join('; ');

const reportTo = JSON.stringify({
  group: 'csp',
  max_age: 10886400,
  endpoints: [{ url: CSP_REPORT_URI }]
});

function csp(_req, res, next) {
  const cspNonce = crypto.randomBytes(16).toString('base64');
  res.locals.cspNonce = cspNonce;
  res.setHeader(CSP_HEADER_NAME, cspPolicy.replace('$random', cspNonce));
  if (CSP_REPORT_URI) {
    res.setHeader('Report-To', reportTo);
  }
  next();
}

function referrer(_req, res, next) {
  res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');
  next();
}

function feature(_req, res, next) {
  res.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), usb=(), payment=(), autoplay=(), fullscreen=(self), ch-ua=(self), ch-ua-platform=(self), ch-ua-mobile=(self), ch-ua-arch=(self), ch-ua-model=(self)'
  );
  next();
}

function link(_req, res, next) {
  const preloadLinks = [
    {
      path: '/stylesheets/fonts/lift-status.woff2',
      as: 'font',
      type: 'font/woff2'
    },
    {
      path: '/stylesheets/fonts/iconvault_forecastfont.woff2',
      as: 'font',
      type: 'font/woff2'
    }
  ].map(linkHeader);

  res.setHeader('Link', preloadLinks);
  next();

  function linkHeader({ path, as, type }) {
    const fields = [`<${staticHost}${res.locals.cachify(path)}>`, 'rel=preload', `as=${as}`];

    if (type) {
      fields.push(`type=${type}`);
    }
    if (staticHost || as === 'font') {
      fields.push('crossorigin=anonymous');
    }

    return fields.join('; ');
  }
}

function toBoolean(str) {
  if (!str) {
    return false;
  }
  str = str.toLowerCase();
  return str === 'true' || str === '1' || str === 'on' || str === 'yes';
}
