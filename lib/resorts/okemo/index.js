var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:okemo');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '#liftsTab .report-trail', function(node) {
    return {
      name: domutil.childText(node, 2),
      status: domutil.child(node, '0/0').attribs.class.split('-').pop()
    };
  });

  debug('Okemo Lift Status:', liftStatus);

  return liftStatus;
}

module.exports = parse;
