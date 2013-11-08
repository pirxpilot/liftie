var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:monarch');


var statusMap = {
  '0': 'closed',
  '1': 'open'
};

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.lift-wrapper h2', function(node) {
    if (node.children.length < 2) {
      return;
    }
    var status = node.children[1].attribs.src.slice(-5, -4);
    return {
      name: node.children[0].data,
      status: statusMap[status] || ''
    };
  });

  debug('Monarch Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
