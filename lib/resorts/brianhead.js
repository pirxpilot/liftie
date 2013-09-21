var select = require('../select');
var coerce = require('../tools/coerce');
var debug = require('debug')('liftie:resort:brianhead');

function parse(dom) {
  var liftStatus = {};

  select(dom, '.lift-report tbody .lift-name').forEach(function(node) {
    var name = node.children[0].data.trim(),
      status = node.next.children[0].attribs.class.split(' ')[1];
    if (status === 'lift-status-delay') {
      // delay means hold in BH
      status = 'lift-status-hold';
    }
    name = name.slice(name.indexOf(' ') + 1);  // strip #1 prefix
    liftStatus[name] = coerce(status, 'lift-status-');
  });

  debug('Brian Head Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = {
  name: 'Brian Head',
  url: {
    host: 'http://www.brianhead.com',
    pathname: '/winter/conditions/snow-report'
  },
  tags: ['Utah'],
  parse: parse
};
