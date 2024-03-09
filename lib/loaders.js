const { promisify, callbackify } = require('node:util');
const debug = require('debug')('liftie:loaders');

module.exports = {
  register,
  load: callbackify(load)
};

const loaders = [];

function register(loader) {
  // promisify functions that take callback arg
  loaders.push(loader.length > 0 ? promisify(loader) : loader);
}

function appendResorts(data, resorts) {
  Object.entries(resorts).forEach(
    ([id, resort]) => data[id] ||= resort
  );
  return data;
}

async function load() {
  debug('Loading resorts...');
  const results = await Promise.all(loaders.map(fn => fn()));
  const data = results.reduce(appendResorts, Object.create(null));
  debug('Loaded %d resorts.', Object.keys(data).length);
  return data;
}
