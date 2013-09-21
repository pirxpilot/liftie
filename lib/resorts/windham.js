var select = require('../select');
var coerce = require('../tools/coerce');
var debug = require('debug')('liftie:resort:windham');

function parse(dom) {
  var liftStatus = {};

  select(dom, '#two td.trail').forEach(function(node) {
    var name = node.children[0].children[0].data,
      status = node.children[5].attribs.alt;
    liftStatus[name] = coerce(status);
  });

  debug('Windham Mountain Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = {
  name: 'Windham Mountain',
  url: {
    host: 'http://www.windhammountain.com',
    pathname: '/the-mountain/mountain-report/'
  },
  tags: ['New York'],
  parse: parse
};
