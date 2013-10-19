var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:winterplace');


function liftNumber(x) {
  var match = x.match(/#(\d+)\s/);
  return parseInt(match[1], 10);
}

function sort(liftStatus) {
  var r = {};
  Object.keys(liftStatus)
    .sort(function(a, b) {
      return liftNumber(a) - liftNumber(b);
    })
    .forEach(function(key) {
      r[key] = liftStatus[key];
    });
  return r;
}

function parse(dom) {
  var liftStatus = {}, liftName;

  var header = select(dom, 'h3').filter(function(h3) {
    return h3.children && h3.children[0] && 'Lift Status' === h3.children[0].data;
  })[0];

  select(header.next, 'td span').forEach(function(span) {
    var text = span.children[0].data;
    if (liftName) {
      liftStatus[liftName] = coerce(text);
      liftName = undefined;
    }
    else {
      liftName = text.slice('Lift '.length);
    }
  });

  liftStatus = sort(liftStatus);

  debug('Winterplace Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
