var select = require('../select');
var coerce = require('./coerce');

module.exports = parse;

// common parser for Vail Resorts lift status
function parse(dom) {
  var liftStatus = {};

  select(dom, '#Lifts tr').forEach(function(tr, index) {
    var name, status;

    if (index === 0) {
      return; // skip header
    }
    name = tr.children[0].children[0].data;
    status = tr.children[2].children[0].attribs.alt;
    if (/ Express Lift$/.test(name)) {
      name = name.slice(0, - ' Express Lift'.length);
    }
    liftStatus[name] = coerce(status);
  });

  return liftStatus;
}