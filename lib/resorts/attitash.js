var select = require('cheerio-soupselect').select;
var coerce = require('../tools/coerce');
var debug = require('debug')('liftie:resort:attitash');

function parse(dom) {
  var liftStatus = {};

  select(dom, 'h5').forEach(function(node) {
    var name = node.children[0].data.slice(0, -3),
      status = node.children[1].children[0].data;
    liftStatus[name] = coerce(status);
  });

  debug('Attitash Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = {
  name: 'Attitash',
  url: {
    host: 'http://www.attitash.com',
    pathname: '/snow-report.html'
  },
  tags: ['New Hampshire', 'New England'],
  parse: parse
};
