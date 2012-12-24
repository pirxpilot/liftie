var select = require('cheerio-soupselect').select;


function statusFromCssClass(classes) {
  var prefix = 'lift_status_';
  return classes.split(' ')
    .filter(function(klass) {
      return klass.slice(0, prefix.length) === prefix;
    })
    .map(function(klass) {
      return klass.slice(prefix.length).toLowerCase();
    })[0];
}

function parse(dom) {
  var liftStatus = [];

  select(dom, '.lift_status_container .lift_status').forEach(function(node) {
    liftStatus.push({
      name: node.children[0].data,
      status: statusFromCssClass(node.attribs['class'])
    });
  });

  return liftStatus;
}

module.exports = {
  name: 'Squaw Valley',
  url: {
    host: 'http://www.squaw.com',
    pathname: '/the-mountain/conditions'
  },
  parse: parse
};
