var debug = require('debug')('liftie:resort:arosa-lenzerheide');
module.exports = parse;

function parse(data) {
  var liftStatus = {};

  data.lifts.forEach(function(lift) {
    liftStatus[lift.popup.title.trim()] = lift.status;
  });

  debug('Arosa Lenzerheide lift status:', liftStatus);
  return liftStatus;
}
