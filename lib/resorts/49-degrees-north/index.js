var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:49-degrees-north');

function parse(dom) {
  var liftStatus = domutil.collect(dom, 'table.report2 td.report3', function(node) {
    return {
      name: domutil.childText(node, 0).trim(),
      status: node.prev.children[0].attribs.src.split('/').pop().slice(5, -4)
    };
  });

  debug('49 Degrees North Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
