var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:stowe');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '#zone i.status + strong', function(node) {
    return {
      name: domutil.childText(node, 0),
      status: node.prev.attribs.title
    };
  });

  debug('Stowe Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
