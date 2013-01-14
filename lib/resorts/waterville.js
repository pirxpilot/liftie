var select = require('cheerio-soupselect').select;
var coerce = require('../tools/coerce');
var debug = require('debug')('liftie:resort:waterville');

function parse(dom) {
  var liftStatus = {};

  select(dom, '#tab1 .status li').forEach(function(node) {
    var name = node.children[0].children[0].data,
      status = node.attribs.class;
    liftStatus[name] = coerce(status);
  });

  debug('Waterville Valley Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = {
  name: 'Waterville Valley',
  url: {
    host: 'http://www.waterville.com',
    pathname: '/ski-ride/snow-report.html'
  },
  tags: ['New Hampshire', 'New England'],
  parse: parse
};
