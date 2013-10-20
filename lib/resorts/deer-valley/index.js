var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:deer-valley');

function parse(dom) {
  var liftStatus = {};

  // add parsing code here
  select(dom, 'h4').forEach(function(h4) {
    if (h4.children[0].data !== 'Lift Status') {
      return;
    }
    select(h4.next, 'tr').forEach(function(node, i) {
      var name, status;
      if (i === 0) {
        // skip header
        return;
      }
      name = node.children[0].children[0].data;
      status = node.children[2].children[0].data;
      liftStatus[name] = coerce(status);
    });
  });

  debug('Deer Valley Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
