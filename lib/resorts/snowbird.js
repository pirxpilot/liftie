var select = require('cheerio-soupselect').select;
var coerce = require('../tools/coerce');
var debug = require('debug')('liftie:resort:snowbird');

function parse(dom) {
  var liftStatus = {};

  select(dom, '#lifts-list li').forEach(function(node) {
    var name = node.children[0].children[0].data,
      status = node.children[1].children[0].data;
    liftStatus[name] = coerce(status);
  });

  debug('Snowbird Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = {
  name: 'Snowbird',
  url: {
    host: 'http://www.snowbird.com',
    pathname: '/lifts-and-trails/#lifts'
  },
  tags: ['Utah'],
  parse: parse
};
