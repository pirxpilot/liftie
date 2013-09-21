var select = require('../select');
var coerce = require('../tools/coerce');
var debug = require('debug')('liftie:resort:brettonwoods');

function parse(dom) {
  var liftStatus = {};

  select(dom, '.liftOperating td').forEach(function(node) {
    if (!node.children || !node.children.length) {
      return;
    }
    var name = node.children[0].data.replace(/(\s+High-Speed Quad)?\s+\(.+$/, ''),
      status = node.attribs.class.replace(/([A-Z])/g, '-$1').split('-')[1];
    liftStatus[name] = coerce(status);
  });

  debug('Bretton Woods Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = {
  name: 'Bretton Woods',
  url: {
    host: 'http://brettonwoods.com',
    pathname: '/alpine_trails/trail_report'
  },
  tags: ['New Hampshire', 'New England'],
  parse: parse
};
