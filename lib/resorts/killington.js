var select = require('cheerio-soupselect').select;


function parse(dom) {
  var liftStatus = {},
    statusConverter = {
      'delay': 'scheduled',
      'open': 'open',
      'windhold': 'hold',
      'closed': 'closed'
    };

  // add parsing code here
  select(dom, '#lift_report-page td.lift').forEach(function(node) {
    var nameNode = node.next,
      name = nameNode.children[0].data.trim(),
      status = nameNode.next.children[0].attribs.src;
    status = status.slice(status.lastIndexOf('/') + 1, -4);
    liftStatus[name] = statusConverter[status] || 'scheduled';
  });

  return liftStatus;
}

module.exports = {
  name: 'Killington',
  url: {
    host: 'http://www.killington.com',
    pathname: '/winter/mountain/conditions/lifts'
  },
  parse: parse
};
