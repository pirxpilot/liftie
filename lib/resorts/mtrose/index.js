var select = require('../../select');


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
  var liftStatus = {};

  select(dom, '.item-page .blackoutline h4').some(function(node) {
    var text;
    text = node.children[0].data.replace(/\s+/g, '');
    if (text !== 'LiftStatus') {
      return;
    }
    select(node.parent, 'div .titlename').forEach(function(row) {
      var status, name;
      name = row.children[0].data;
      status = row.next.attribs.src.slice('/assets/snow_report/'.length, -'.gif'.length);
      liftStatus[name] = coerceStatus(status);
    });
    return true;
  });
  return liftStatus;
}

module.exports = parse;
