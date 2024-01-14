const async = require('async');
const debug = require('debug')('liftie:loaders');

module.exports = {
  register,
  load
};

const loaders = [];

function register(loader) {
  loaders.push(loader);
}

function appendResorts(data, resorts) {
  Object.keys(resorts).forEach((id) => {
    if (!data[id]) {
      data[id] = resorts[id];
    }
  });
  return data;
}

function load(fn) {
  debug('Loading resorts...');
  async.parallel(loaders, (err, results) => {
    const data = results.reduce(appendResorts, Object.create(null));
    debug('Loaded %d resorts.', Object.keys(data).length);
    fn(null, data);
  });
}
