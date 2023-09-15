var debug = require('debug')('liftie:resort:Saalbach-hinterglemm');
module.exports = parse;

function parse(data) {
  var liftStatus = {};

  data.lifts.forEach(function(lift) {
    liftStatus[lift.popup.title.trim()] = lift.status;
  });

  debug('Saalbacch-hinterglemm lift status:', liftStatus);
  return liftStatus;
}