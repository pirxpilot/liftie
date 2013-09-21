var select = require('../select');
var coerce = require('../tools/coerce');
var debug = require('debug')('liftie:resort:hunter');

function parse(dom) {
  var liftStatus = {};

  select(dom, '.snowReportSection .liftName').forEach(function(node) {
    var name = node.children[0].data,
      status = node.prev.children[0].attribs.alt;
    liftStatus[name] = coerce(status);
  });

  debug('Hunter Mountain Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = {
  name: 'Hunter Mountain',
  url: {
    host: 'http://www.huntermtn.com',
    pathname: '/huntermtn/snow-report.aspx'
  },
  tags: ['New York'],
  parse: parse
};
