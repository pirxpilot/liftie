import { parseHtml } from './parser.js';
import request from './request.js';

export default (url, parse, fn) => {
  request(url)
    .then(async res => {
      if (res.status < 200 || res.status >= 300) {
        console.error('Error', url, res.status);
        if (!url.ignoreErrors) {
          return fn(res.status);
        }
      }
      const text = await res.text();
      if (!text) {
        console.error('Empty response', url);
        return fn('empty response');
      }
      parseHtml(text, parse, fn);
    })
    .catch(fn);
};
