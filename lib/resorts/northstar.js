var select = require('../select');
var coerce = require('../tools/coerce');

function parse(dom) {
  var liftStatus = {};

  // add parsing code here
  select(dom, 'table.snowreport:nth-child(3) td.snowreport img').forEach(function(img) {
    var name, status;
    name = img.parent.prev.children[0].data.slice(0, -1).trim();
    status = img.parent.next.children[0].data;
    liftStatus[name] = coerce(status, 0, -1);
  });

  return liftStatus;
}

module.exports = {
  name: 'Northstar',
  url: {
    host: 'http://www.northstarattahoe.com',
    pathname: '/groomingreport.asp'
  },
  tags: ['California', 'Lake Tahoe'],
  parse: parse
};
