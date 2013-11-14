var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:red-mountain');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.stripe th h6', function(node) {
    var tr = node.parent.parent;
    if (tr.attribs.style && tr.attribs.style.indexOf('display:none') >= 0) {
      // temporary: looks like they are adding a new lift
      return;
    }
    return {
      name: domutil.childText(tr, '0/1').trim(),
      status: domutil.childText(node, 0)
    };
  });

  debug('Red Mountain Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
