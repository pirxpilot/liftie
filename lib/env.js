import { tmpdir } from 'node:os';

const {
  CSP_REPORT_URI,
  LIFTIE_CSP_ENFORCE,
  LIFTIE_STATIC_HOST = '',
  LOG_DIR = tmpdir(),
  NODE_ENV = 'development',
  OPENWEATHER_API_KEY,
  PORT = 3000,
  WEBCAMS_API_KEY
} = process.env;

process.env.SITE_URL ??= `http://localhost:${PORT}`;

const { SITE_URL } = process.env;

export {
  CSP_REPORT_URI,
  LIFTIE_CSP_ENFORCE,
  LIFTIE_STATIC_HOST,
  LOG_DIR,
  NODE_ENV,
  OPENWEATHER_API_KEY,
  PORT,
  SITE_URL,
  WEBCAMS_API_KEY
};
