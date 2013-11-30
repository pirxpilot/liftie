var domutil = require('./domutil');
var debug = require('debug')('liftie:resort');

function parse(dom) {
  var liftStatus = domutil.collect(dom, '.lift_list_table tbody tr', function(tr) {
    var last = tr.children[tr.children.length - 1],
      status = domutil.findText(last);

    if (!status) {
      status = last.children[0].attribs.alt;
      if (status) {
        status = status.split(' ').pop();
      }
    }
    return {
      name: domutil.childText(tr, '0/0'),
      status: status
    };
  });

  debug('Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
