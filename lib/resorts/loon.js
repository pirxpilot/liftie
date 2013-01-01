var select = require('cheerio-soupselect').select;


function parse(dom) {
  var liftStatus = {}, convertStatus = {
    'Open': 'open',
    'Closed': 'closed',
    'Hold': 'hold',
    'Scheduled': 'scheduled'
  };

  select(dom, '.reportTable:first img').forEach(function(node) {
    var name = node.parent.prev.children[0].data,
      status = node.parent.next.children[0].data;
    liftStatus[name] = convertStatus[status] || 'scheduled';
  });

  return liftStatus;
}

module.exports = {
  name: 'Loon Mountain',
  url: {
    host: 'http://www.loonmtn.com',
    pathname: '/winter/Lift-Trail-Report.aspx'
  },
  tags: ['New England'],
  parse: parse
};
