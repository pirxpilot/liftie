var select = require('cheerio-soupselect').select;
var coerce = require('../tools/coerce');
var debug = require('debug')('liftie:resort:wildcat');

function parse(dom) {
  var liftStatus = {};

  select(dom, 'h5').forEach(function(node) {
    var name = node.children[0].data.slice(0, -3),
      status = node.children[1].children[0].data;
    liftStatus[name] = coerce(status);
  });

  debug('Wildcat Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = {
  name: 'Wildcat',
  url: {
    host: 'http://www.skiwildcat.com',
    pathname: '/snow-report.html'
  },
  tags: ['New Hampshire', 'New England'],
  parse: parse
};
