var debug = require('debug')('liftie:coerce');
var entities = require('./entities');

module.exports = coerceStatus;

var map = {
  'o': 'open',
  'op': 'open',
  'y': 'open',
  'yes': 'open',
  'ok': 'open',
  'open': 'open',
  'opened': 'open',
  'green': 'open',
  'checkmark': 'open',
  'ouvert': 'open',
  'ouverte': 'open',
  'on': 'open',
  '1': 'open',

  'n': 'closed',
  'x': 'closed',
  'no': 'closed',
  'cl': 'closed',
  'close': 'closed',
  'closed': 'closed',
  'closedfortheday': 'closed',
  'cross': 'closed',
  'geschlossen': 'closed',
  'blank': 'closed',
  'red': 'closed',
  'ferme': 'closed',
  'fermée': 'closed',
  'f': 'closed',
  '3': 'closed',
  'off': 'closed',

  'h': 'hold',
  'hd': 'hold',
  'hold': 'hold',
  'windhold': 'hold',
  'weatherhold': 'hold',
  'maintenancehold': 'hold',
  'safety': 'hold',
  'onhold': 'hold',
  'standby': 'hold',
  'code': 'hold',

  'scheduled': 'scheduled',
  'onschedule': 'scheduled',
  'expected': 'scheduled',
  'delay': 'scheduled',
  'delayed': 'scheduled',
  'prevision': 'scheduled',
  'blue': 'scheduled',
  'p': 'scheduled',
  '2': 'scheduled',
  "En cours d'ouverture": 'scheduled'
};


/**
 * More flexible slice. If from, or to are strings we determine their position in the string
 * and slice appropriately. In all other cases it works like normal slice
 */
function slice(str, from, to) {
  if (typeof from === 'string') {
    from = str.lastIndexOf(from) + from.length;
  }
  if (typeof to === 'string') {
    to = str.indexOf(to);
  }
  return str.slice(from, to);
}

/*
 * slice, trim, lowercase and coerce to standard liftie statuses
 * If no usuable status is found, return 'scheduled'
 */
function coerceStatus (status, start, stop) {
  var s;
  if (arguments.length > 1) {
    status = slice(status, start, stop);
  }
  status = entities(status);
  status = status.replace(/[\s_\-]+/g, '').toLowerCase();
	s = map[status];
  if (!s) {
    debug('Uknown status %s. Treated as <scheduled>', status);
    s = 'scheduled';
  }
  return s;
}
