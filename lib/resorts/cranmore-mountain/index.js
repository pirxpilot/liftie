var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:cranmore-mountain');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '#lift-data .list-group-item', function(node) {
    return {
      name: domutil.childText(node, 0),
      status: domutil.child(node, 1).attribs.class.split('-').pop()
    };
  });

  debug('Cranmore Mountain Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
