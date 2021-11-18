const crypto = require('crypto');
const { cachify } = require('connect-cachify-static');

module.exports = [
  csp,
  referrer,
  feature,
  link
];

const {
  LIFTIE_STATIC_HOST: staticHost = '',
  LIFTIE_CSP_ENFORCE,
  CSP_REPORT_URI
} = process.env;

const scriptHost = staticHost ? staticHost : `'self'`;


const CSP_HEADER_NAME = toBoolean(LIFTIE_CSP_ENFORCE) ? 'Content-Security-Policy' : 'Content-Security-Policy-Report-Only';

const cspPolicy = [
  `base-uri 'self'`,
  `object-src 'none'`,
  `worker-src 'self'`,
  `script-src 'nonce-$random' 'strict-dynamic' ${scriptHost}`,
  `report-to csp`
].join('; ');

const reportTo = JSON.stringify({
  group: 'csp',
  max_age: 10886400,
  endpoints: [
    { "url": CSP_REPORT_URI }
  ]
});

function csp(req, res, next) {
  let cspNonce = crypto.randomBytes(16).toString('base64');
  res.locals.cspNonce = cspNonce;
  res.header(CSP_HEADER_NAME, cspPolicy.replace('$random', cspNonce));
  if (CSP_REPORT_URI) {
    res.header('Report-To', reportTo);
  }
  next();
}

function referrer(req, res, next) {
  res.header('Referrer-Policy', 'no-referrer-when-downgrade');
  next();
}

function feature(req, res, next) {
  res.header('Feature-Policy', `fullscreen 'self'`);
  next();
}

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

function link(req, res, next) {
  res.header('Link', preloadLinks);
  next();
}

function toBoolean(str) {
  if (!str) {
    return false;
  }
  str = str.toLowerCase();
  return str === 'true' || str === '1' || str === 'on' || str === 'yes';
}

function linkHeader({ path, as, type }) {
  const fields = [
    `<${staticHost}${cachify(path)}>`,
    'rel=preload',
    `as=${as}`
  ];

  if (type) {
    fields.push(`type=${type}`);
  }
  if (staticHost || as === 'font') {
    fields.push('crossorigin=anonymous');
  }

  return fields.join('; ');
}
