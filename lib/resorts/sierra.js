var select = require('cheerio-soupselect').select;


function parse(dom) {
  var liftStatus = {},
    statusCoerce = {
      'Y': 'open',
      'N': 'closed',
      'H': 'hold'
    };

  select(dom, '#block-sierra_conditions-lift-report td img').forEach(function(img) {
    var td, name, status;
    td = img.parent;
    name = td.children[1].data;
    status = td.next.children[0].data;
    liftStatus[name] = statusCoerce[status] || 'scheduled';
  });

  return liftStatus;
}

module.exports = {
  name: 'Sierra at Tahoe',
  url: {
    host: 'https://www.sierraattahoe.com',
    pathname: '/mountain/conditions?quicktabs_1=1#quicktabs-1'
  },
  parse: parse
};
