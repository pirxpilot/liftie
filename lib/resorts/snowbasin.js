var select = require('../select');
var coerce = require('../tools/coerce');
var debug = require('debug')('liftie:resort:snowbasin');

function parse(dom) {
  var liftStatus = {};

  select(dom, '.trail .label.last').forEach(function(node) {
    var name = node.children[1].data,
      status = node.next.children[0].data;
    liftStatus[name] = coerce(status);
  });

  debug('Snowbasin Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = {
  name: 'Snowbasin',
  url: {
    host: 'http://www.snowbasin.com',
    pathname: '/mountain/mountain-report/'
  },
  tags: ['Utah'],
  parse: parse
};
