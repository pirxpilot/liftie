var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:kirkwood');

var url = {
  host: 'http://winter.kirkwood.com',
  pathname: '/site/mountain/snow-report',
};

function parse(dom) {
  var liftStatus = {};

  select(dom, '.runType').forEach(function(node) {
    var name = node.prev.children[0].children[0].data,
      classes = node.next.attribs.class.split(' '),
      status = classes[classes.length - 1],
      match = name.match(/^#\d+\s+(.+)$/);

    if (match) {
      liftStatus[match[1]] = coerce(status);
    }
  });

  debug('Kirkwood Lift Status:', liftStatus);
  return liftStatus;
}


function dateAtKirkwood() {
 var kirkwoodOffset = -(480 * 60000),
    d = new Date(),
    utc = d.getTime() + d.getTimezoneOffset() * 60000;
  return new Date(utc + kirkwoodOffset);
}

/*
 * Kirkwood maintain lift status for each date.
 * We need to calculate URL suffix based on the current date.
 * Suffix follows 'YYYY-M-D' patern: months are numbered from 1,
 * months and day are not prefixed with 0s.
 */
function getUrl() {
  var d = dateAtKirkwood(),
    suffix;

  suffix = [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-');
  return {
    host: url.host,
    pathname: url.pathname + '/' + suffix
  };
}

module.exports = parse;
