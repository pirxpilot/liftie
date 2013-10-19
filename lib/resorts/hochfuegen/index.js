var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:hochfuegen');

function parse(dom) {
  var liftStatus = {};

  select(dom, '.lifte tr').forEach(function(node, index) {
    if (index === 0) {
      // skip header
      return;
    }
    var name = node.children[1].children[0].data.trim(),
      status = node.children[0].children[0].attribs.src,
      suffixIndex = name.indexOf(' – ');
    // trim really long names
    if (suffixIndex > 0) {
      name = name.slice(0, suffixIndex);
    }
    liftStatus[name] = coerce(status, '/', -4);
  });

  debug('Hochfügen Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
