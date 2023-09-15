var debug = require('debug')('liftie:resort:st-st.moritz');
module.exports = parse;

function parse(data) {
  var liftStatus = {};

  data.lifts.forEach(function(lift) {
    liftStatus[lift.popup.title.trim()] = lift.status;
  });

  debug('st anton am arlberg lift status:', liftStatus);
  return liftStatus;
}
