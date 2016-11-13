var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:alta');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '#lift-status + table tr', function(tr) {
    var status = domutil.child(tr, '1/0').attribs['class'].split('-').pop();
    return {
      name: domutil.childText(tr, 0),
      status: status
    };
  });

  debug('Alta Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
