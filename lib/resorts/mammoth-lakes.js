var select = require('cheerio-soupselect').select;
var coerce = require('../tools/coerce');

function parse(dom) {
  var liftStatus = {};

  select(dom, '#mcLifts img.status').forEach(function(img) {
    var name = img.parent.next.children[0].data,
      src = img.attribs.src;
    liftStatus[name] = coerce(src, src.lastIndexOf('/') + 1, -4);
  });

  return liftStatus;
}

module.exports = {
  name: 'Mammoth Lakes',
  url: {
    host: 'http://www.mammothmountain.com',
    pathname: '/Mountain/Conditions/LiftStatus/'
  },
  tags: ['California'],
  parse: parse
};
