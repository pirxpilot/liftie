var select = require('cheerio-soupselect').select;
var coerce = require('../tools/coerce');
var debug = require('debug')('liftie:resort:snowmass');

function parse(dom) {
  var liftStatus = {};

  // add parsing code here
  select(dom, '#tabs-1 .grooming-report tbody tr').forEach(function(node) {
    var name = node.children[0].children[0].data,
      status = node.children[2].children[0] ? 'open' : 'closed';
    liftStatus[name] = coerce(status);
  });

  debug('Snowmass Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = {
  name: 'Snowmass',
  url: {
    host: 'http://www.aspensnowmass.com',
    pathname: '/snowmass/grooming'
  },
  tags: ['Colorado', 'Aspen'],
  parse: parse
};
