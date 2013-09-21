var select = require('../select');
var coerce = require('../tools/coerce');

function parse(dom) {
  var reportTable, liftStatus = {};

  reportTable = select(dom, '.reportTable')[0];
  select(reportTable, 'img').forEach(function(node) {
    var name = node.parent.prev.children[0].data,
      status = node.parent.next.children[0].data;
    liftStatus[name] = coerce(status);
  });

  return liftStatus;
}

module.exports = {
  name: 'Loon Mountain',
  url: {
    host: 'http://www.loonmtn.com',
    pathname: '/winter/Lift-Trail-Report.aspx'
  },
  tags: ['New England', 'New Hampshire'],
  parse: parse
};
