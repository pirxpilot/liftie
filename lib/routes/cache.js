const { readFile, writeFile, rename } = require('node:fs').promises;
const debug = require('debug')('liftie:cache');

module.exports = cache;

function cache(file) {
  const fileNew = `${file}.new`;
  let data;
  let promiseData;
  let loaded = 0;
  let timeout;

  function get(key) {
    if (!loaded) {
      return;
    }
    return data[key];
  }

  function set(key, value) {
    if (!loaded) {
      return;
    }
    data[key] = value;
    if (!timeout) {
      timeout = setTimeout(dump, 60000); // 1 minute
    }
  }

  async function load() {
    async function readData() {
      try {
        debug('Reading from %s', file);
        const str = await readFile(file, { encoding: 'utf8' });
        return JSON.parse(str);
      } catch (e) {
        console.error('Cannot read cache data', e);
        return {};
      }
    }

    if (!promiseData) {
      promiseData = readData();
    }
    data = await promiseData;
    debug('Data is: %j', data);
    return ++loaded;
  }

  async function dump() {
    timeout = undefined;
    if (loaded < 1) {
      return;
    }
    try {
      const str = JSON.stringify(data);
      debug('Writing to %s %s...', fileNew, str.slice(0, 100));
      await writeFile(fileNew, str, { encoding: 'utf8' });
      await rename(fileNew, file);
    } catch (e) {
      console.error('Cannot write cache data', e);
    }
  }

  return {
    get,
    set,
    load
  };
}
