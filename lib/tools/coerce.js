var debug = require('debug')('liftie:coerce');

module.exports = coerceStatus;

var map = {
  'o': 'open',
  'y': 'open',
  'yes': 'open',
  'open': 'open',
  'n': 'closed',
  'x': 'closed',
  'no': 'closed',
  'closed': 'closed',
  'closedfortheday': 'closed',
  'h': 'hold',
  'hold': 'hold',
  'windhold': 'hold',
  'maintenancehold': 'hold',
  'onhold': 'hold',
  'standby': 'hold',
  'scheduled': 'scheduled',
  'onschedule': 'scheduled',
  'expected': 'scheduled',
  'delay': 'scheduled',
  'delayed': 'scheduled'
};

/*
 * slice, trim, lowercase and coerce to standard liftie statuses
 * If no usuable status is found, return 'scheduled'
 */
function coerceStatus (status, start, stop) {
  var s;
  if (arguments.length > 1) {
    status = status.slice(start, stop);
  }
	status = status.replace(/[\s_\-]+/g, '').toLowerCase();
	s = map[status];
  if (!s) {
    debug('Uknown status %s. Treated as <scheduled>', status);
    s = 'scheduled';
  }
  return s;
}