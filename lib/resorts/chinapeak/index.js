var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:chinapeak');


function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(s) {
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  });
}

function parse(dom) {
  var liftStatus = {};

  // add parsing code here
  select(dom, '#ContentPlaceHolder1_chairs_dlChairs tbody tr td div').forEach(function(node) {
    var name = node,
      status = node;

    name = toTitleCase(name.children[0].data);
    liftStatus[name] = coerce(status.children[1].data);
  });


  debug('China Peak Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
