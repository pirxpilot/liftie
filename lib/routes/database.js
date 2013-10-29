var path = require('path');
var dirty = require('dirty');

module.exports = database;

var dbFileName = path.resolve(process.env.LOG_DIR || require('os').tmpDir(), 'liftie.db');

// persistent storage status for each resort
function database(cache, forEachPlugin) {
  var db = dirty(dbFileName),
    loaded,
    onloadFn;

  function write(id) {
    var info = {};
    forEachPlugin(function(plugin) {
      var chunk = cache[id].data[plugin];
      if (chunk) {
        info[plugin] = chunk;
      }
    });
    db.set(id, info);
  }

  function read(id) {
    var info = db.get(id);
    if (!info) {
      return;
    }
    forEachPlugin(function(plugin) {
      var chunk = info[plugin];
      if (chunk) {
        cache[id].data[plugin] = chunk;
        // TODO: remove timestamp upgrade
        if (chunk.timestamp) {
          cache[id].data.timestamp[plugin] = chunk.timestamp;
          delete chunk.timestamp;
        }
      }
    });
  }

  function onload(fn) {
    if (typeof loaded == 'number') {
      process.nextTick(fn.bind(null, loaded));
    }
    else {
      // store handler to be called when event fires
      onloadFn = fn;
    }
  }

  db.on('load', function(count) {
    loaded = count;
    if (onloadFn) {
      onloadFn(loaded);
    }
  });

  return {
    write: write,
    read: read,
    onload: onload
  };
}
