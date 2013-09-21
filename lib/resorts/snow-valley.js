var select = require('../select');
var coerce = require('../tools/coerce');
var debug = require('debug')('liftie:resort:snow-valley');


function findText(node) {
  while(node && node.type !== 'text') {
    node = node.children && node.children[0];
  }
  if (node) {
    return node.data;
  }
}


function parse(dom) {
  var liftStatus = {};

  var liftsTable = select(dom, 'a[name="lifts"]')[0];
  while(liftsTable.name !== 'table') {
    liftsTable = liftsTable.parent;
  }

  // add parsing code here
  select(liftsTable, 'tr').forEach(function(node, index) {
    if (index === 0 || node.children.length !== 2) {
      return; //ski header and spacers
    }
    var tdName = node.children[0],
      tdStatus = node.children[1],
      len = tdName.children.length,
      name = tdName.children[len - 1].data,
      status = findText(tdStatus);

    name = name.split('-')[0].trim();
    if (name) {
      liftStatus[name] = coerce(status);
    }
  });

  debug('Snow Valley Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = {
  name: 'Snow Valley',
  url: {
    host: 'http://www.snow-valley.com',
    pathname: '/current_conditions/snow_report.html'
  },
  tags: ['California'],
  parse: parse
};
