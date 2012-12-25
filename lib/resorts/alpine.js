var select = require('cheerio-soupselect').select;


function parse(dom) {
  var liftStatus = {};

  select(dom, '.lift_header h4').forEach(function(node) {
    var name = node.children[0].data,
      status = node.next.attribs['class'].slice('lift_status_'.length);
    liftStatus[name] = status;
  });

  return liftStatus;
}

module.exports = {
  name: 'Alpine Meadows',
  url: {
    host: 'http://www.skialpine.com',
    pathname: '/mountain/snow-report'
  },
  parse: parse
};
