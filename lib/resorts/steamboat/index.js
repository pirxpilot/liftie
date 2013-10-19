var debug = require('debug')('liftie:resort:steamboat');

function parse(data) {
  var liftStatus = {},
    statusTable = ['open', 'closed', 'scheduled', 'hold'];

  data.forEach(function(lift) {
    var status = parseInt(lift.Status, 10);
    liftStatus[lift.Name] = statusTable[status] || 'scheduled';
  });

  debug('Steamboat Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
