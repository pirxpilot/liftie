var select = require('cheerio-soupselect').select;
var coerce = require('../tools/coerce');
var debug = require('debug')('liftie:resort:jackson-hole');


function parse(dom) {
  var liftStatus = {};

  function parseLift(li) {
    var name = li.children[0].data,
      status = li.attribs.class;
    liftStatus[name] = coerce(status);
  }

  select(dom, 'h2').forEach(function(node) {
    if (node.children[0].data !== 'Lift Status') {
      return;
    }
    while(node.next.attribs.class === 'one-third break') {
      node = node.next;
      select(node, 'li').forEach(parseLift);
    }
  });

  debug('Jackson Hole Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = {
  name: 'Jackson Hole',
  url: {
    host: 'http://www.jacksonhole.com',
    pathname: '/ski-lift-grooming-report.html'
  },
  tags: ['Wyoming'],
  parse: parse
};
