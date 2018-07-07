var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:mt-buller');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.lift', function(node) {
    return {
      name: node.children[0].data,
      status: node.children[1].data
    };
  });

  debug('Mount Buller Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
