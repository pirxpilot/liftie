var select = require('cheerio-soupselect').select;

module.exports = parse;

var statusMap = {
  'Yes': 'open',
  'No': 'closed',
  'On Hold': 'hold'
};

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
    liftStatus[name] = statusMap[status] || 'scheduled';
  });

  return liftStatus;
}