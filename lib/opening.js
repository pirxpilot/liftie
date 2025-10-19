import Debug from 'debug';
import { hour } from './tools/millis.js';

const debug = Debug('liftie:opening');

fetch.interval = {
  active: hour,
  inactive: 12 * hour
};

function str2date(date) {
  if (!date) {
    return;
  }
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  return match && new Date(match[1], match[2] - 1, match[3]);
}

function ifNotOpenYet(opening) {
  const openingDate = str2date(opening);
  if (openingDate && openingDate >= Date.now()) {
    return opening;
  }
}

export default function fetch(resort, fn) {
  debug('Calculate opening for %s', resort.id);
  process.nextTick(fn.bind(null, null, ifNotOpenYet(resort.opening)));
}
