var select = require('../select');
var coerce = require('../tools/coerce');
var debug = require('debug')('liftie:resort:smuggs');

function parse(dom) {
  var liftStatus = {};

  select(dom, '#snow-report-body .lift').forEach(function(node) {
    var name = node.parent.children[4].data.trim().slice(0, - ' Lift'.length),
      status = node.prev.attribs.class;
    liftStatus[name] = coerce(status);
  });

  debug('Smugglers\' Notch Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = {
  name: 'Smugglers\' Notch',
  url: {
    host: 'http://www.smuggs.com',
    pathname: '/pages/winter/snowReport/'
  },
  tags: ['New England', 'Vermont'],
  parse: parse
};
