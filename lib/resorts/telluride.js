var select = require('cheerio-soupselect').select;
var coerce = require('../tools/coerce');
var debug = require('debug')('liftie:resort:telluride');

function parse(dom) {
  var liftStatus = {};

  select(dom, 'lifts lift').forEach(function(node) {
    var name = node.attribs.heading,
      status = node.attribs.status;
    liftStatus[name] = coerce(status);
  });

  debug('Telluride Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = {
  name: 'Telluride',
  dataUrl: {
    host: 'http://us3.resorts-interactive.com',
    pathname: '/vicomap/getMapDetails.php',
    query: {
      mapID: 102
    }
  },
  url: {
    host: 'http://tellurideskiresort.com',
    pathname: '/TellSki/snow-report.aspx'
  },
  tags: ['Colorado'],
  parse: parse
};
