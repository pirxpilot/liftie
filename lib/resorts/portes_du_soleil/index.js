var debug = require('debug')('liftie:resort:portes_du_soleil');
module.exports = parse;

function parse(data) {
  var liftStatus = {};

  // Iterate through each object in the array
  data.lifts.forEach(function (liftData) {
    // Check if the object has a 'popup' property with 'title' and 'status'
    if (liftData.popup && liftData.popup.title && liftData.popup.status) {
      var title = liftData.popup.title.trim();
      var status = liftData.popup.status;
      // Set status to 'closed' for all statuses other than 'open'
      if (status === 'open') {
        liftStatus[title] = 'open';
      } else {
        liftStatus[title] = 'closed';
      }
    }
  });

  debug('portes_du_soleil lift status:', liftStatus);
  return liftStatus;
}
