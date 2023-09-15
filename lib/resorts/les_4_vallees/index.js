var debug = require('debug')('liftie:resort:les_4_vallees');
module.exports = parse;

function parse(data) {
  var liftStatus = {};

  data.lifts.forEach(function(lift) {
    liftStatus[lift.popup.title.trim()] = lift.status;
  });

  debug('les_4_vallees lift status:', liftStatus);
  return liftStatus;
}
