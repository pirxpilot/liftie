var select = require('../select');
var coerce = require('../tools/coerce');
var debug = require('debug')('liftie:resort:big-white');

function parse(dom) {
  var liftStatus = {};

  // add parsing code here
  select(dom, '#lift .lift-item').forEach(function(node) {
    var name = node.children[0].children[1].data.trim().slice(0, -2),
      status = node.children[1].children[0].attribs.alt;
    liftStatus[name] = coerce(status);
  });

  debug('Big White Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = {
  name: 'Big White',
  url: {
    host: 'http://www.bigwhite.com',
    pathname: '/mountain-info/mountain-reports/lift-status'
  },
  tags: ['British Columbia'],
  parse: parse
};
