var superagent = require('superagent');
var debug = require('debug')('liftie:weather');

var interval = 6 * 60 * 60 * 1000; // once every 6 hours regardless of activity

module.exports = fetch;
module.exports.interval = {
  active: interval,
  inactive: interval
};

var apikey = process.env.WUND_API_KEY;

function isoDate(year, month, day) {
  function pad(n) {
    return n < 10 ? '0' + n : n;
  }
  return [year, pad(month), pad(day)].join('-');
}


// see: http://www.wunderground.com/weather/api/d/docs?d=data/index&MR=1
function apiUrl(ll) {
  var query = [ll[1], ll[0]].join(',') + '.json';

  return [
    'http://api.wunderground.com/api',
    apikey,
    'forecast',
    'q',
    query
  ].join('/');
}

function sanitize(res) {
  var simple = res.forecast.simpleforecast.forecastday[0],
    text = res.forecast.txt_forecast.forecastday[0],
    date = simple.date;
  return {
    date: isoDate(date.year, date.month, date.day),
    icon: simple.skyicon,
    text: text.fcttext,
    conditions: simple.conditions,
    temperature: {
      min: parseInt(simple.low.fahrenheit, 10),
      max: parseInt(simple.high.fahrenheit, 10)
    },
    snow: parseInt(simple.snow_allday.in, 10)
  };
}

function fetch(resort, fn) {
  if (!apikey) {
    debug('Configure wunderground.com API key!');
    return fn(null, {});
  }
  if (!Array.isArray(resort.ll) || resort.ll.length != 2) {
    // no error but alson nothing to do
    debug('%s - location missing.', resort.id);
    return fn(null, {});
  }

  superagent
    .get(apiUrl(resort.ll))
    .end(function(res) {
      if(!res.ok) {
        console.error('Weather fetch error', resort.name, res.error);
        fn(res.status);
      }
      fn(null, sanitize(res.body));
    });
}