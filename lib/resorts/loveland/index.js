var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:loveland');

function parse(dom) {
  var liftStatus = {};

  // add parsing code here
  select(dom, '#runstatusNew img').forEach(function(node) {
    var name = node.attribs.src, match, status;

    match = name.match(/^images\/chair(\d+)(.*)\.gif$/);
    if (!match && name === 'images/MidwayOnly.gif') {
      match = [ undefined, '2 Midway Only', 'open' ];
    }
    if (match) {
      name = 'Chair ' + match[1];
      status = match[2];
      liftStatus[name] = coerce(status);
    }
    
  });

  debug('Loveland Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
