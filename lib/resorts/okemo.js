var select = require('cheerio-soupselect').select;
var debug = require('debug')('liftie:resort:okemo');


function trim(str) {
  return str.replace(/&nbsp;/g, '').trim();
}

function parse(dom) {
  var liftStatus = {};

  select(dom, '#panelOne div:eq(2) td:first').forEach(function(td) {
    td.children.forEach(function(node) {
      var name;
      if (node.type === 'text') {
        name = trim(node.data);
        if (name.length) {
          liftStatus[name] = 'closed';
        }
      } else if (node.type === 'tag' && node.name === 'b') {
        // open in bold! - special price to Okemo for originality
        name = trim(node.children[0].data);
        liftStatus[name] = 'open';
      }
    });

  });

  debug('Okemo Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = {
  name: 'Okemo',
  url: {
    host: 'http://www.okemo.com',
    pathname: '/activities/snowsports/dailyreport.asp'
  },
  tags: ['New England'],
  parse: parse
};
