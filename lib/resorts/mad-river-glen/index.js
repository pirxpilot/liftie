var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:mad-river-glen');

function parse(dom) {
  var liftStatus = {};

  select(dom, '#cond-trails td > font').forEach(function(node) {
    var name, status;
    if (!node.parent.attribs.hasOwnProperty('align')
         && !node.parent.attribs.hasOwnProperty('bgcolor')
         && node.children[0].type === 'text') {
      name = node.children[0].data;
      node = select(node.parent.next, 'font');
      if (node && node.length) {
        status = node[0].children[0].data.trim();
        liftStatus[name] = coerce(status !== '&nbsp;' ? 'open' : 'closed');
      }
    }
  });

  debug('Mad River Glen Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
