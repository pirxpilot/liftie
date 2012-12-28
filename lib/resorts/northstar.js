var select = require('cheerio-soupselect').select;


function parse(dom) {
  var liftStatus = {},
    statusCoerce = {
      'Y': 'open',
      'N': 'closed',
      'H': 'hold'
    };


  // add parsing code here
  select(dom, 'table.snowreport:eq(2) td.snowreport img').forEach(function(img) {
    var name, status;
    name = img.parent.prev.children[0].data.slice(0, -1).trim();
    status = img.parent.next.children[0].data.slice(0, -1).trim();
    liftStatus[name] = statusCoerce[status] || 'scheduled';
  });

  return liftStatus;
}

module.exports = {
  name: 'Northstar',
  url: {
    host: 'http://www.northstarattahoe.com',
    pathname: '/groomingreport.asp'
  },
  parse: parse
};
