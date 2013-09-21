var select = require('../select');
var coerce = require('../tools/coerce');
var debug = require('debug')('liftie:resort:mthigh');

function parse(dom) {
  var liftStatus = {};

  select(dom, '#block-mthigh_conditions-lift-report td.name').forEach(function(node) {
    var name = node.children[0].data,
      status = node.next.children[0].attribs.class;
    liftStatus[name] = coerce(status);
  });

  debug('Mountain High Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = {
  name: 'Mountain High',
  url: {
    host: 'http://www.mthigh.com',
    pathname: '/trails-conditions/trails'
  },
  tags: ['California'],
  parse: parse
};
