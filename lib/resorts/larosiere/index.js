var domutil = require('../../tools/domutil');
var select = require('../../select');
var debug = require('debug')('liftie:resort:larosiere');
var coerce = require('../../tools/coerce');

function parse(dom) {

  var liftStatus = {};

  select(dom, 'table.etat_tab').forEach(function(node) {

    var tableRows = domutil.findTableRows(node), i;

    if(tableRows && domutil.findText(tableRows.children[0]) === 'Ski lift') {
      for(i=1; i<tableRows.children.length; i+=1) {
        liftStatus[domutil.findText(tableRows.children[i])] = coerce(domutil.findStatusAltText(tableRows.children[i], 2));
      }
    }
  });

  debug('La Rosiere Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
