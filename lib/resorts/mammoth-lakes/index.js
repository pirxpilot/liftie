var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:mammoth-lakes');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.lift-description', function(node) {
    return {
      name: domutil.childText(node, 0),
      status: node.prev.attribs.class.split(/[-\s]/).pop()
    };
  });

  debug('Mammoth Lakes Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
