var select = require('cheerio-soupselect').select;
var coerce = require('../tools/coerce');
var debug = require('debug')('liftie:resort:squaw');

function statusFromCssClass(classes) {
  var prefix = 'lift_status_';
  return classes.split(' ')
    .filter(function(klass) {
      return klass.slice(0, prefix.length) === prefix;
    })
    .map(function(klass) {
      return coerce(klass, prefix.length);
    })[0];
}

function parse(dom) {
  var liftStatus = {};

  select(dom, '.lift_status_container .lift_status').forEach(function(node) {
    if (node.children.length) {
      liftStatus[node.children[0].data] = statusFromCssClass(node.attribs['class']);
    }
  });

  debug('Squaw Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = {
  name: 'Squaw Valley',
  url: {
    host: 'http://www.squaw.com',
    pathname: '/the-mountain/conditions'
  },
  tags: ['California', 'Lake Tahoe'],
  parse: parse
};
