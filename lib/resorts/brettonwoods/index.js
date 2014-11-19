var select = require('../../select');
var coerce = require('../../tools/coerce');
var entities = require('../../tools/entities');
var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:brettonwoods');

function parse(dom) {
  var liftStatus = {};

  select(dom, '#trail-content > div:nth-of-type(-n + 2)').forEach(function(div) {
    var name, status;

    div.children.forEach(function(node) {
      if (node.type === 'text') {
        name = domutil.findText(node);
        if (name) {
          name = name.trim().replace(/\s+High-Speed Quad$/, '');
          name = entities(name);
        }
      } else if (node.type === 'tag' && node.name === 'span') {
        status = node.attribs.class || 'open';
        if (name) {
          liftStatus[name] = coerce(status);
          name = undefined;
        }
      }
    });
  });

  debug('Bretton Woods Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
