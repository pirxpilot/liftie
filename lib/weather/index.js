var superagent = require('superagent');
var async = require('async');
var debug = require('debug')('liftie:weather');
var RateLimiter = require('limiter').RateLimiter;
var millis = require('../tools/millis');

// not more than 10 a minute, not more than 300 a day

function Limiter(items) {
  function hasTokens() {
    return items.every(function(l) {
      return l.getTokensRemaining();
    });
  }

  function removeToken(fn) {
    async.each(items, function(l, fn) {
      l.removeTokens(1, fn);
    }, fn);
  }

  return {
    hasTokens: hasTokens,
    removeToken: removeToken
  };
}

var limiter = Limiter([
  new RateLimiter(10, millis.minute),
  new RateLimiter(300, millis.day)
]);

module.exports = fetch;
module.exports.interval = {
  active: 8 * millis.hour, // once every 8 hours for active resorts
  inactive: Infinity // don't fetch on inactive
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
    // debug('Configure wunderground.com API key!');
    return process.nextTick(fn);
  }
  if (!Array.isArray(resort.ll) || resort.ll.length != 2) {
    // no error but also nothing to do
    debug('%s - location missing.', resort.id);
    return process.nextTick(fn);
  }
  if (!limiter.hasTokens()) {
    debug('Weather API limit %s', resort.id);
    return process.nextTick(fn.bind(null, {
      fetchLater: true
    }));
  }

  debug('request weather for %s', resort.id);
  limiter.removeToken(function(err) {
    if (err) {
      return fn(err);
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
  });
}