var select = require('cheerio-soupselect').select;


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

  select(dom, '#page .sr_head b').forEach(function(node) {
    var text, table;
    text = node.children[0].data.replace(/\s+/g, '');
    if (text !== 'LiftStatus') {
      return;
    }
    table = node.parent.parent.parent.parent;
    select(table, 'img').forEach(function(img) {
      var status, name;
      if (!img.parent.prev) {
        return;
      }
      name = img.parent.prev.children[0].data;
      if (!name) {
        return;
      }
      status = img.attribs.src.slice('/assets/snow_report/'.length, -'.gif'.length);
      liftStatus[name] = coerceStatus(status);
    });

  });
  return liftStatus;
}

module.exports = {
  name: 'Mount Rose',
  url: {
    host: 'http://www.skirose.com',
    pathname: '/on-the-mountain/snow-report'
  },
  tags: ['California', 'Lake Tahoe'],
  parse: parse
};
