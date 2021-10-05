const superagent = require('superagent');
const debug = require('debug')('liftie:webcams');

const { day } = require('./tools/millis');
const limiter = require('./tools/limiter');

const userAgent = 'Mozilla/5.0 (compatible; Liftie/1.0; +https://liftie.info)';

module.exports = fetch;
module.exports.interval = {
  active: day,
  inactive: Infinity
};

const limit = limiter(12, 'minute');  // 12 times a minute
const notice = `Webcams provided by
<a href="https://www.windy.com/" target="_blank" rel="noopener">windy.com</a> &mdash;
<a href="https://www.windy.com/webcams/add" target="_blank" rel="noopener">add a webcam</a>
`;


function convert({ title, image, url }) {
  const name = title.replace(/'/g, '&apos;');
  return {
    name,
    source: url.current.desktop,
    image: image.current.preview,
    notice,
    mobile: {
      name,
      source: url.current.mobile,
      image: image.current.preview,
      notice
    }
  };
}


function getStatic({ webcams }) {
  if (webcams && webcams.length) {
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
  limit(function(err) {
    if (err) {
      debug('webcams API limit %s', resort.id);
      return fn(err);
    }
    debug("fetch webcams from Windy for %s", resort.id);

    const { ll: [ lon, lat ] } = resort;
    const url = `https://api.windy.com/api/webcams/v2/list/nearby=${lat},${lon},5/limit=5?show=webcams:image,url`;
    superagent(url)
      .set('User-Agent', userAgent)
      .accept('application/json')
      .set("x-windy-key", WEBCAMS_API_KEY)
      .then(onData, onError);

    function onError(err) {
      debug('Webcam API error', err);
      fn(null, getStatic(resort));
    }

    function onData({ body }) {
      const { status, result } = body;
      if (status !== 'OK') {
        debug('Invalid response', status);
        return fn(null, getStatic(resort));
      }
      if (result.webcams.length < 1) {
        return fn(null, getStatic(resort));
      }
      debug('Webcam API response', result.webcams);
      fn(null, result.webcams.map(convert));
    }
  });
}
