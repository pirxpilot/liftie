var select = require('cheerio-soupselect').select;
var coerce = require('../tools/coerce');
var debug = require('debug')('liftie:resort:sugarbowl');


function parse(dom) {
  var liftStatus = {};

  select(dom, '.c_light table img').forEach(function(node) {
    var name = node.parent.prev.children[0].children[0].data,
      status = node.attribs.alt;
    liftStatus[name] = coerce(status);
  });

  debug('Sugar Bowl Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = {
  name: 'Sugar Bowl',
  url: {
    host: 'http://www.sugarbowl.com',
    pathname: '/conditions'
  },
  tags: ['California', 'Lake Tahoe'],
  parse: parse
};
