var select = require('cheerio-soupselect').select;
var coerce = require('../tools/coerce');

function parse(dom) {
  var liftStatus = {};

  select(dom, '#block-sierra_conditions-lift-report td img').forEach(function(img) {
    var td, name, status;
    td = img.parent;
    name = td.children[1].data;
    status = td.next.children[0].data;
    liftStatus[name] = coerce(status);
  });

  return liftStatus;
}

module.exports = {
  name: 'Sierra at Tahoe',
  url: {
    host: 'https://www.sierraattahoe.com',
    pathname: '/mountain/conditions?quicktabs_1=1#quicktabs-1'
  },
  tags: ['California', 'Lake Tahoe'],
  parse: parse
};
