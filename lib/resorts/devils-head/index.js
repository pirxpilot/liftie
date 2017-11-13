var domutil = require('../../tools/domutil');

module.exports = {
  selector: 'h2:contains(Lift Status) + .table-1 tbody tr td:nth-child(odd)',
  parse: {
    name: 1,
    status: n => domutil.childText(n.next, '0/0')
  }
};
