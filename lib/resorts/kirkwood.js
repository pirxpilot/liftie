var select = require('cheerio-soupselect').select;
var coerce = require('../tools/coerce');
var debug = require('debug')('liftie:resort:kirkwood');

function parse(dom) {
  var liftStatus = {};

  select(dom, '.groomingReportContainer .groomingReportData').forEach(function(node) {
    var name = node.children[0].data,
      status = node.next.children[0].data;

    if (name !== 'Lift') {
      liftStatus[name] = coerce(status);
    }
  });

  debug('Kirkwood Lift Status:', liftStatus);
  return liftStatus;
}


module.exports = {
  name: 'Kirkwood',
  dataUrl: {
    host: 'http://m.kirkwood.com',
    pathname: '/kirkwood-trail-status.html'
  },
  url: {
    host: 'http://winter.kirkwood.com',
    pathname: '/site/mountain/snow-report',
  },
  tags: ['California', 'Lake Tahoe'],
  parse: parse
};
