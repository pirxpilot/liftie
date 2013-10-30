var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:copper');

function trimLift(name) {
  if (' Lift' === name.slice(-5)) {
    return name.slice(0, -5);
  }
  return name;
}

function parse(dom) {
  var liftStatus = {};

  select(dom, '.header_box td.collapse_show_button').forEach(function(node) {
    var name = node.next.next,
      status = name.next;

    name = name.children[0].children[0].data;
    status = status.children[0].attribs.src;
    liftStatus[trimLift(name)] = coerce(status, status.lastIndexOf('/') + 1, -4);
  });

  debug('Copper Mountain Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
