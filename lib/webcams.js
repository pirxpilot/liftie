const superagent = require('superagent');
const debug = require('debug')('liftie:webcams');

const { minute } = require('./tools/millis');
const limiter = require('./tools/limiter');

const userAgent = 'Mozilla/5.0 (compatible; Liftie/1.0; +https://liftie.info)';

module.exports = fetch;
module.exports.interval = {
  active: 8.5 * minute,  // v3 API images are only valid for 10 minutes
  inactive: Number.POSITIVE_INFINITY
};

const limit = limiter(12, 'minute'); // 12 times a minute
const notice = `Webcams provided by
<a href="https://www.windy.com/" target="_blank" rel="noopener">windy.com</a> &mdash;
<a href="https://www.windy.com/webcams/add" target="_blank" rel="noopener">add a webcam</a>
`;


function convert({ title, images, urls }) {
  const name = title.replace(/'/g, '&apos;');
  return {
    name,
    source: urls.detail,
    image: images.current.preview,
    notice
  };
}


function getStatic({ webcams }) {
  if (webcams?.length) {
    return webcams;
  }
}

function fetch(resort, fn) {
  debug("Fetching webcams for %s", resort.id);
  const { WEBCAMS_API_KEY } = process.env;
  if (!resort.ll || !WEBCAMS_API_KEY) {
    debug('API key not defined', resort.ll, process.env);
    return process.nextTick(fn, null, getStatic(resort));
  }
  limit((err) => {
    if (err) {
      debug('webcams API limit %s', resort.id);
      return fn(err);
    }
    debug("fetch webcams from Windy for %s", resort.id);

    const { ll: [lon, lat] } = resort;
    const url = new URL('https://api.windy.com/webcams/api/v3/webcams');
    const { searchParams: sp } = url;
    sp.set('limit', 5);
    sp.set('nearby', `${lat},${lon},5`);
    sp.set('include', 'images,urls');
    superagent(url)
      .set('User-Agent', userAgent)
      .accept('application/json')
      .set("x-windy-api-key", WEBCAMS_API_KEY)
      .then(onData, onError);

    function onError(err) {
      debug('Webcam API error', err);
      fn(null, getStatic(resort));
    }

    function onData({ body }) {
      const { webcams } = body;
      if (webcams.length < 1) {
        return fn(null, getStatic(resort));
      }
      debug('Webcam API response', webcams);
      fn(null, webcams.map(convert));
    }
  });
}
