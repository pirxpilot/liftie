var select = require('../select');
var coerce = require('../tools/coerce');
var debug = require('debug')('liftie:resort:crested-butte');

function parse(dom) {
  var liftStatus = {};

  // add parsing code here
  select(dom, '#boxLiftReport tr').forEach(function(node, index) {
    if (index === 0) {
      // skip header
      return;
    }
    var name = node.children[0].children[0].data,
      status = node.children[1].children[0].data;
    liftStatus[name] = coerce(status);
  });

  debug('Crested Butte Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = {
  name: 'Crested Butte',
  url: {
    host: 'http://www.skicb.com',
    pathname: '/cbmr/lift-status.aspx'
  },
  tags: ['Colorado'],
  parse: parse
};
