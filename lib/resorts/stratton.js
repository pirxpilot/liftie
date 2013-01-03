var select = require('cheerio-soupselect').select;
var debug = require('debug')('liftie:resort:stratton');

function parse(dom) {
  var liftStatus = {}, statusConverter = {
    'Open': 'open',
    'Closed': 'closed',
    'Hold': 'hold',
    'Scheduled': 'scheduled'
  };

  select(dom, '#statusTablesLift img').forEach(function(img) {
    var name = img.parent.children[1].data,
      status = img.parent.next.next.children[0].data;
    liftStatus[name] = statusConverter[status];
  });

  debug('Lift Status', liftStatus);
  return liftStatus;
}

module.exports = {
  name: 'Stratton',
  url: {
    host: 'http://www.stratton.com',
    pathname: '/the-mountain/lift-and-trail-report.aspx'
  },
  tags: ['New England'],
  parse: parse
};
