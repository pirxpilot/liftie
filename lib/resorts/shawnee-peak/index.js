var domutil = require('../../tools/domutil');
var entities = require('../../tools/entities');
var debug = require('debug')('liftie:resort:shawnee-peak');

function parse(dom) {
  var liftStatus = domutil.collect(dom, 'ul.trailinfo:last-child li', function(node) {
    return {
      name: entities(domutil.childText(node, 0)).trim(),
      status: domutil.child(node, '1/0').attribs.alt
    };
  });

  debug('Shawnee Peak Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
