var select = require('cheerio-soupselect').select;
var coerce = require('../tools/coerce');
var debug = require('debug')('liftie:resort:squaw');

function parse(dom) {
  var liftStatus = {};

  select(dom, '#block-lifts-lifts-table td .name').forEach(function(node) {
    var name, status;
    name = node.children[0].data;
    status = node.parent.prev.children[0].attribs.class;
    liftStatus[name] = coerce(status);
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
