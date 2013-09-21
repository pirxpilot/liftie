var select = require('../select');
var coerce = require('../tools/coerce');
var debug = require('debug')('liftie:resort:big-sky');

function parse(dom) {
  var liftStatus = {};

  // add parsing code here
  select(dom, '.lifts th').forEach(function(node) {
    var name = node.children[0].data,
      status = node.next.attribs.class;
    liftStatus[name] = coerce(status, 'lift-'.length);
  });

  debug('Big Sky Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = {
  name: 'Big Sky',
  url: {
    host: 'http://www.bigskyresort.com',
    pathname: '/Activities/Winter/Conditions.asp'
  },
  tags: ['Montana'],
  parse: parse
};
