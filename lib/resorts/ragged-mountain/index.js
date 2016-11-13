var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:ragged-mountain');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.third .trails tr', function(node) {
    var status = node.attribs.class.split('-').pop();
    return {
      name: domutil.childText(node, 1),
      status: status == '1' ? 'open' : 'closed'
    };
  });

  debug('Ragged Mountain Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
