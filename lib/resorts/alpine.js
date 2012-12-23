var select = require('cheerio-soupselect').select;


function parse(dom) {
  var liftStatus = [];

  select(dom, '.lift_header').forEach(function(node) {
    var name = select(node, 'h4')[0];
    liftStatus.push({
      name: name.children[0].data,
      status: name.next.attribs['class'].slice('lift_status_'.length)
    });
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
