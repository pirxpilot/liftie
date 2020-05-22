const crypto = require('crypto');

module.exports = [
  csp
];

const {
  LIFTIE_STATIC_HOST: staticHost = `'self'`,
  LIFTIE_CSP_ENFORCE,
  CSP_REPORT_URI
} = process.env;


const CSP_HEADER_NAME = toBoolean(LIFTIE_CSP_ENFORCE) ? 'Content-Security-Policy' : 'Content-Security-Policy-Report-Only';

const cspPolicy = [
  `base-uri 'self'`,
  `object-src 'none'`,
  `worker-src 'self'`,
  `script-src 'nonce-$random' 'strict-dynamic' ${staticHost}`,
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

function toBoolean(str) {
  if (!str) {
    return false;
  }
  str = str.toLowerCase();
  return str === 'true' || str === '1' || str === 'on' || str === 'yes';
}
