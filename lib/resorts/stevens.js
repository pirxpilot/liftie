var select = require('../select');
var coerce = require('../tools/coerce');
var debug = require('debug')('liftie:resort:stevens');


function parse(dom) {
  var liftStatus = {};

  function parseLiftTable(table) {
    select(table, 'tr').forEach(function(node, index) {
      var name, status, oper;

      if (index === 0 || node.children.length != 5) {
        return;
      }
      name = node.children[0].children[0].data;
      status = node.children[3].children[0].data;
      oper = node.children[4].children[0].data.toLowerCase();
      if (oper !== 'operational') {
        status = oper;
      }
      liftStatus[name] = coerce(status);
    });
  }

  select(dom, '#cmtContent table').forEach(parseLiftTable);

  debug('Stevens Pass Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = {
  name: 'Stevens Pass',
  url: {
    host: 'http://www.stevenspass.com',
    pathname: '/Stevens/lifts-grooming.aspx'
  },
  tags: ['Washington'],
  parse: parse
};
