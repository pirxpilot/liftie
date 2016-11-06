
var superagent = require('superagent'),
  debug = require('debug')('liftie:webcams'),
  day = require('./tools/millis').day,
  limiter = require('./tools/limiter');

module.exports = fetch;
module.exports.interval = {
  active: day,
  inactive: Infinity
};

var limit = limiter(12, 'minute');  // 12 times a minute

function apiUrl(resort) {
  return [
    'https://webcamstravel.p.mashape.com/webcams/list/nearby=',
    resort.ll[1],
    ',',
    resort.ll[0],
    ',5?show=webcams:url,image'
  ].join('');
}

function webcamFromAPI(cam) {
  var name = cam.title.replace(/'/g, '&apos;');
  return {
    name: name,
    source: cam.url.current.desktop,
    image: cam.image.current.preview,
    notice: 'Webcam by <a href="http://webcams.travel" target="_blank">webcams.travel</a>',
    mobile: {
      name: name,
      source: cam.url.current.mobile,
      image: cam.image.current.preview,
      notice: 'Webcam by <a href="http://m.webcams.travel" target="_blank">webcams.travel</a>'
    }
  };
}

function fetch(resort, fn) {
  var webcams;
  debug("Fetching webcams for %s", resort.id);
  if (!resort.ll || !process.env.WEBCAMS_DEV_ID) {
    if (resort.webcams && resort.webcams.length) {
      webcams = resort.webcams;
    }
    return process.nextTick(fn.bind(null, null, webcams));
  }
  limit(function(err) {
    if (err) {
      debug('webcams.travel API limit %s', resort.id);
      return fn(err);
    }
    superagent(apiUrl(resort))
    .set('X-Mashape-Key', process.env.WEBCAMS_DEV_ID)
    .end(function (err, res) {
      if (err) {
        debug('Failed query webcams for:', resort.id, err.status);
        return fn(err.status);
      }
      debug('Webcams nearby %s:', resort.id, res.text);
      if (res.body.status !== 'OK') {
        return fn(res.body.status);
      }
      if (!res.body.result.total && resort.webcams && resort.webcams.length) {
        // empty response but we have previous version...
        return fn(null, resort.webcams);
      }
      fn(null, res.body.result.webcams.map(webcamFromAPI));
    });
  });
}
