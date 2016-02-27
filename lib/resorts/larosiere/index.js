var domutil = require('../../tools/domutil');
var debug = require('debug')('liftie:resort:larosiere');

function parse(dom) {

  // select all lifts: Téléski, Télésiège etc. - starting with "Télés"
  var liftStatus = domutil.collect(dom, 'table.etat_tab tr td img[alt^="Télé"]', function(img) {

    var tr = img.parent.parent;
    return {
      name: domutil.childText(tr, '0'),
      status: domutil.child(tr, '2/0').attribs.alt
    };
  });

  debug('La Rosiere Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
