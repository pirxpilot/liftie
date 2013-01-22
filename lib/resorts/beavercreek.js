var select = require('cheerio-soupselect').select;
var coerce = require('../tools/coerce');
var debug = require('debug')('liftie:resort:beavercreek');

function stripSuffix(name, suffix) {
  if (name.slice(- suffix.length) === suffix) {
    return name.slice(0, - suffix.length);
  }
  return name;
}

function parse(dom) {
  var liftStatus = {};

  select(dom, '#fragment2 .trail').forEach(function(node, index) {
    if (index === 0) {
      // skip header
      return;
    }
    var name = node.children[0].data,
      status = node.prev.children[0].attribs.alt;
    name = stripSuffix(name, ' Express Lift');
    liftStatus[name] = coerce(status);
  });

  debug('Beaver Creek Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = {
  name: 'Beaver Creek',
  url: {
    host: 'http://www.beavercreek.com',
    pathname: '/the-mountain/terrain-status.aspx'
  },
  tags: ['Colorado'],
  parse: parse
};
