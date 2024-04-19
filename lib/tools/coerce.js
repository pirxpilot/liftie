const debug = require('debug')('liftie:coerce');

module.exports = coerceStatus;

const map = {
  'o': 'open',
  'op': 'open',
  'opn': 'open',
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
  'check': 'open',
  'true': 'open',
  'aperta': 'open',
  'aperto': 'open',
  'normal': 'open',

  'n': 'closed',
  'x': 'closed',
  'no': 'closed',
  'cl': 'closed',
  'cls': 'closed',
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
  'false': 'closed',
  'chiusa': 'closed',
  'chiuso': 'closed',
  'closedforseason': 'closed',
  'cerrado': 'closed',

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
  'caution': 'hold',
  'condicional': 'hold',

  'scheduled': 'scheduled',
  'onschedule': 'scheduled',
  'expected': 'scheduled',
  'delay': 'scheduled',
  'delayed': 'scheduled',
  'prevision': 'scheduled',
  'blue': 'scheduled',
  'p': 'scheduled',
  '2': 'scheduled',
  'in-preparations': 'scheduled',
  "En cours d'ouverture": 'scheduled'
};


/**
 * More flexible slice. If from, or to are strings we determine their position in the string
 * and slice appropriately. In all other cases it works like normal slice
 */
function slice(str, [from, to]) {
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
 * If no usable status is found, return 'scheduled'
 */
function coerceStatus(status, ...dels) {
  if (status) {
    if (dels.length > 0) {
      status = slice(status, dels);
    }
    status = status.replace(/[\s_\-]+/g, '').toLowerCase();
  }
  let s = map[status];
  if (!s) {
    debug('Unknown status %s. Treated as <scheduled>', status);
    s = 'scheduled';
  }
  return s;
}
