var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:sun-peaks');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.lifts-trails .node-view-row:not(.lift-trail-header)', function(node) {
    var status = domutil.child(node, '1/0').attribs.class.split('-').pop();
    if (status === 'tick') {
      status = 'open';
    }
    return {
      name: domutil.findText(node, 0),
      status: status
    };
  });

  debug('Sun Peaks Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
