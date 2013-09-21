var select = require('../select');
var coerce = require('../tools/coerce');
var debug = require('debug')('liftie:resort:brighton');

function parse(dom) {
  var liftStatus = {};

  select(dom, '#skireport .skilift-label').forEach(function(node) {
    var name = node.children[1].data,
      status = node.children[0].attribs.class.split(' ')[1];
    liftStatus[name] = coerce(status, 'skistatus-');
  });

  debug('Brighton Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = {
  name: 'Brighton',
  url: {
    host: 'http://www.brightonresort.com',
    pathname: '/skireport-main.html'
  },
  tags: ['Utah'],
  parse: parse
};
