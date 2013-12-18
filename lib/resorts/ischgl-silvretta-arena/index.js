var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:ischgl-silvretta-arena');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.tab:first-child .facilities .state .icon', function(node) {
    return {
      name: domutil.findText(node.parent.next.next),
      status: node.attribs.class.split(' ').pop()
    };
  });

  debug('Ischgl - Silvretta Arena Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
