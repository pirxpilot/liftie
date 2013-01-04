module.exports = coerceStatus;

var map = {
  'y': 'open',
  'yes': 'open',
  'open': 'open',
  'n': 'closed',
  'no': 'closed',
  'closed': 'closed',
  'h': 'hold',
  'hold': 'hold',
  'windhold': 'hold',
  'maintenancehold': 'hold',
  'onhold': 'hold',
  'standby': 'hold',
  'scheduled': 'scheduled',
  'expected': 'scheduled',
  'delay': 'scheduled',
  'delayed': 'scheduled'
};

/*
 * slice, trim, lowercase and coerce to standard liftie statuses
 * If no usuable status is found, return 'scheduled'
 */
function coerceStatus (status, start, stop) {
  if (arguments.length > 1) {
    status = status.slice(start, stop);
  }
	status = status.replace(/[\s_\-]+/g, '').toLowerCase();
	return map[status] || 'scheduled';
}