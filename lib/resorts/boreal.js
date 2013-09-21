var select = require('../select');
var coerce = require('../tools/coerce');
var debug = require('debug')('liftie:resort:boreal');

function parse(dom) {
  var liftStatus = {};

  select(dom, '.report tbody tr').forEach(function(node) {
    var name = node.children[1].children[0].children[0].data,
      status = node.children[2].children[0].children[0].data;
    liftStatus[name] = coerce(status);
  });

  debug('Boreal Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = {
  name: 'Boreal',
  url: {
    host: 'http://www.rideboreal.com',
    pathname: '/winter/mountain_info/snow-report'
  },
  tags: ['California', 'Lake Tahoe'],
  parse: parse
};
