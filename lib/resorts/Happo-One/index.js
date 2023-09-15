var debug = require('debug')('liftie:resort:happo-one');
module.exports = parse;

function parse(data) {
  var liftStatus = {};

  data.lifts.forEach(function(lift) {
    liftStatus[lift.popup.title.trim()] = lift.status;
  });

  debug('Happo One lift status:', liftStatus);
  return liftStatus;
}
