const domutil = require('./domutil');
const debug = require('debug')('liftie:resort');

function parse(dom) {
  const liftStatus = domutil.collect(dom, '.lift_list_table tbody tr', (tr) => {
    const last = tr.children[tr.children.length - 1];
    let status = domutil.findText(last);

    if (!status) {
      status = last.children[0].attribs.alt;
      if (status) {
        status = status.split(' ').pop();
      }
    }
    return {
      name: domutil.childText(tr, '0/0'),
      status
    };
  });

  debug('Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
