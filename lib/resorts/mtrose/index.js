var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:mtrose');

function coerceStatus(status) {
  var regexes = [/^closed/, /hold/, /^open\d/, /^open/],
    statuses = ['closed', 'hold', 'scheduled', 'open'],
    i;

  for(i = 0; i < regexes.length; i++) {
    if (regexes[i].test(status)) {
      return statuses[i];
    }
  }
  return 'scheduled';
}

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.liftname', function (node) {
    var img, status;
    img = node.next.children[0];
    status = img.attribs.src.slice('/assets/snow_report/'.length, -'.gif'.length);
    return {
      name: domutil.childText(node, 0),
      status: coerceStatus(status)
    };
  });

  debug('Mt Rose Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
