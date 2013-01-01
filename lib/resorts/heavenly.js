var select = require('cheerio-soupselect').select;


var statusMap = {
  'Yes': 'open',
  'No': 'closed',
  'On Hold': 'hold'
};

function parse(dom) {
  var liftStatus = {};

  select(dom, '#Lifts tr').forEach(function(tr, index) {
    var name, status;

    if (index === 0) {
      return; // skip header
    }
    name = tr.children[0].children[0].data;
    status = tr.children[2].children[0].attribs.alt;
    liftStatus[name] = statusMap[status] || 'scheduled';
  });

  return liftStatus;
}

module.exports = {
  name: 'Heavenly',
  url: {
    host: 'http://www.skiheavenly.com',
    pathname: '/the-mountain/terrain-and-lift-status.aspx#Lifts#Top'
  },
  tags: ['California', 'Lake Tahoe'],
  parse: parse
};
