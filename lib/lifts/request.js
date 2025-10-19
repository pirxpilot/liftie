const userAgent = 'Mozilla/5.0 (compatible; Liftie/1.0; +https://liftie.info)';

export default function request({ host, pathname, query }) {
  const fullUrl = new URL(pathname, host);
  if (query) {
    fullUrl.search = new URLSearchParams(query).toString();
  }
  return fetch(fullUrl, {
    headers: {
      'User-Agent': userAgent,
      Accept: '*/*'
    }
  });
}
