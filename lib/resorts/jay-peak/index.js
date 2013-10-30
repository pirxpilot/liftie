var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:jay-peak');

function parse(dom) {
  var liftStatus = {};

  select(dom, '.trail-lift-listing h2').forEach(function(h2) {
    if (h2.children[0].data.indexOf('Lift Status') !== 0) {
      return;
    }
    select(h2.next, '.trail').forEach(function(node) {
      var name, status;
      if (node.children[0].attribs.class !== 'trail_info trail_info_title') {
        // skip trails
        return;
      }
      name = node.children[0].children[0].data;
      status = node.children[1].children[0].data;
      liftStatus[name] = coerce(status);
    });
  });

  debug('Jay Peak Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
