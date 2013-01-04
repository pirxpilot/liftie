var select = require('cheerio-soupselect').select;
var coerce = require('../tools/coerce');
var debug = require('debug')('liftie:resort:${ id }');

function parse(dom) {
  var liftStatus = {};

  // add parsing code here
  select(dom, '.lift').forEach(function(node) {
    var name = node.children[0].data,
      status = node.children[1].data;
    liftStatus[name] = coerce(status);
  });

  debug('${ name } Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = {
  name: '${ name }',
  url: {
    host: '${ host }',
    pathname: '${ pathname }'
  },
  parse: parse
};
