var select = require('../../select');
var coerce = require('../../tools/coerce');
var debug = require('debug')('liftie:resort:stevens');


function parse(dom) {
  var liftStatus = {};

  function parseLiftTable(table) {
    select(table, 'tr').forEach(function(node) {
      var name, status;

      if (node.children.length != 5) {
        return;
      }
      name = node.children[1].children[0].data.trim();
      if (/Pipe|Park$/.test(name)) {
        // skip parks
        return;
      }
      status = node.children[2].children[0].attribs['class'].split(' ').pop().split('-').pop();
      liftStatus[name] = coerce(status);
    });
  }

  select(dom, 'table.report-table tbody').forEach(parseLiftTable);

  debug('Stevens Pass Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
