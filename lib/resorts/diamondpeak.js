var select = require('cheerio-soupselect').select;
var coerce = require('../tools/coerce');
var debug = require('debug')('liftie:resort:diamondpeak');

function parse(dom) {
  var liftStatus = {};

  // add parsing code here
  select(dom, '#lifts table td').forEach(function(node) {
    if (node.children[0].name !== 'img') {
      return;
    }
    var status = node.children[0].attribs.alt,
      name = node.children[1].data.trim();
    liftStatus[name] = coerce(status);
  });

  debug('Diamond Peak Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = {
  name: 'Diamond Peak',
  url: {
    host: 'http://diamondpeak.com',
    pathname: '/conditions'
  },
  tags: ['Lake Tahoe', 'Nevada'],
  parse: parse
};
