var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:pico');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '#pico_lifts-report .Report-title', function(node) {
    return {
      name: domutil.findText(node),
      status: domutil.child(node.next, 0).attribs['class'].split('-').pop()
    };
  });

  debug('Pico Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
