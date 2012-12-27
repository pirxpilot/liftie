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
  name: 'Homewood',
  url: {
    host: 'http://www.skihomewood.com/',
    pathname: '/mountain/snow-report'
  },
  parse: parse
};
