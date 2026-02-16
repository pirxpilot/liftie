import { LIFTIE_USER_AGENT } from '../env.js';

export default function request({ host, pathname, query }) {
  const fullUrl = new URL(pathname, host);
  if (query) {
    fullUrl.search = new URLSearchParams(query).toString();
  }
  return fetch(fullUrl, {
    headers: {
      'User-Agent': LIFTIE_USER_AGENT,
      Accept: '*/*'
    }
  });
}
