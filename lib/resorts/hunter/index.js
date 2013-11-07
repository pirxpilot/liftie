var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:hunter');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.snowReportSection .liftName', function(node) {
    return {
      name: domutil.childText(node, 0),
      status: node.prev.children[0].attribs.alt
    };
  });

  debug('Hunter Mountain Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
