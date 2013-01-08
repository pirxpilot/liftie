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

module.exports = {
  name: 'Steamboat',
  api: {
    host: 'http://app.steamboat.com',
    pathname: '/data/winterlifts'
  },
  url: {
    host: 'http://www.steamboat.com',
    pathname: '/the-mountain/lift-status.aspx'
  },
  tags: ['Colorado'],
  parse: parse
};
