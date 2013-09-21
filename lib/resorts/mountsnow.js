var select = require('../select');
var coerce = require('../tools/coerce');
var debug = require('debug')('liftie:resort:mountsnow');

function parse(dom) {
  var liftStatus = {};

  select(dom, '.col-wrapper h8').forEach(function(node) {
    var name, status, match;

    name = node.children[0].data;
    match = name.match(/^#\d+\s+(.+)$/);
    if (!match) {
      return;
    }

    name = match[1];
    status = select(node.parent.next, 'img').reduce(function(prev, item) {
      return item.attribs.src;
    }, null);
    if (status) {
      liftStatus[name] = coerce(status, status.lastIndexOf('/') + 1, -4);
    }
  });

  debug('Mount Snow Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = {
  name: 'Mount Snow',
  url: {
    host: 'http://mountsnow.com',
    pathname: '/snow-report/'
  },
  tags: ['Vermont', 'New England'],
  parse: parse
};
