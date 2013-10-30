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
  var liftStatus = {}, node;

  node = select(dom, '#snowreport a[name="liftstatus"]');
  if (node && node.length) {
    node = node[0].parent;
    select(node.parent, 'span.status img').forEach(function (img) {
      var status, name;
      status = img.attribs.src.slice('/assets/snow_report/'.length, -'.gif'.length);
      name = img.parent.parent;
      name = select(name, 'span.liftname');
      if (name && name.length) {
        name = name[0].children[0].data;
        liftStatus[name] = coerceStatus(status);
      }
    });
  }
  return liftStatus;
}

module.exports = parse;
