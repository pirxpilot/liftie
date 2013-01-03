var select = require('cheerio-soupselect').select;


function parse(dom) {
  var liftStatus = {};

  select(dom, '#liftstatus span').forEach(function(node) {
    var name = node.children[0].data,
      status = node.attribs['class'].slice('sprite-'.length).toLowerCase();
    if (['open', 'closed', 'hold', 'scheduled'].indexOf(status) > -1) {
      liftStatus[name] = status;
    }
  });

  return liftStatus;
}

module.exports = {
  name: 'Sugarloaf',
  url: {
    host: 'http://www.sugarloaf.com',
    pathname: '/TheMountain/DailyReport/trail_lifts.html'
  },
  tags: ['New England'],
  parse: parse
};
