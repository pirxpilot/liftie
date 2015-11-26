var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:mtrose');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.sr-ski-lift', function (node) {
    return {
      name: domutil.childText(node, 0),
      status: domutil.child(node, 1).attribs['class'].split(/[ -]/)[6]
    };
  });

  debug('Mt Rose Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
