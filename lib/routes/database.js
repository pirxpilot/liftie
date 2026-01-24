import path from 'node:path';
import { LOG_DIR } from '../env.js';
import * as plugins from '../plugins.js';
import dbCache from './cache.js';

const dbFileName = path.resolve(LOG_DIR, 'liftie.db.json');

// persistent storage status for each resort
export default function database(cache) {
  const db = dbCache(dbFileName);
  let loaded;

  function write(id) {
    const info = {
      timestamp: cache[id].data.timestamp
    };
    plugins.forEach(plugin => {
      const chunk = cache[id].data[plugin];
      if (chunk) {
        info[plugin] = chunk;
      }
    });
    db.set(id, info);
  }

  function read(id) {
    const info = db.get(id);
    if (!info) {
      return;
    }
    plugins.forEach(plugin => {
      const chunk = info[plugin];
      if (chunk) {
        cache[id].data[plugin] = chunk;
        if (info.timestamp) {
          cache[id].data.timestamp[plugin] = info.timestamp[plugin] || 0;
        }
      }
    });
  }

  function onload(fn) {
    if (!loaded) {
      loaded = db.load();
    }
    loaded.then(c => process.nextTick(fn, null, c)).catch(e => process.nextTick(fn, e));
  }

  return {
    write,
    read,
    onload
  };
}
