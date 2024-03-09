const path = require('node:path');
const plugins = require('../plugins');
const dbCache = require('./cache');

module.exports = database;

const dbFileName = path.resolve(process.env.LOG_DIR || require('node:os').tmpdir(), 'liftie.db.json');

// persistent storage status for each resort
function database(cache) {
  const db = dbCache(dbFileName);
  let loaded;

  function write(id) {
    const info = {
      timestamp: cache[id].data.timestamp
    };
    plugins.forEach((plugin) => {
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
    plugins.forEach((plugin) => {
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
    loaded
      .then(c => process.nextTick(fn, null, c))
      .catch(e => process.nextTick(fn, e));
  }

  return {
    write,
    read,
    onload
  };
}
