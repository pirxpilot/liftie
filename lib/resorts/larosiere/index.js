var domutil = require('../../tools/domutil');
var select = require('../../select');
var debug = require('debug')('liftie:resort:larosiere');
var coerce = require('../../tools/coerce');

function parse(dom) {

    var liftState = {};
    
    select(dom, 'table.etat_tab').forEach(function(node, index) {
                        
        var tableRows = domutil.findTableRows(node);
    
        if  (tableRows && domutil.findText(tableRows.children[0]) === 'Ski lift')
        {
            for(i=1; i<tableRows.children.length; i+=1) {
                liftState[domutil.findText(tableRows.children[i])] = coerce(domutil.findStatusAltText(tableRows.children[i], 2));
            }
        }        
    });
    
  debug('La Rosiere Lift Status:', liftState);
  return liftState;
}

module.exports = parse;
