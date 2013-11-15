var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:kitzbuehel');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.contentTeasers td.name', function(node) {
    return {
      name: node.children[0].data,
      status: node.next.attribs.class.split(' ').pop()
    };
  });

  debug('Kitzbuehel Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
