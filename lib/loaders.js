var async = require('async');
var debug = require('debug')('liftie:loaders');

module.exports = {
  register: register,
  load: load
};

var loaders = [];

function register(loader) {
  loaders.push(loader);
}

function appendResorts(data, resorts) {
  Object.keys(resorts).forEach(function(id) {
    if(!data[id]) {
      data[id] = resorts[id];
    }
  });
  return data;
}

function load(fn) {
  debug('Loading resorts...');
  async.parallel(loaders, function(err, results) {
    var data = results.reduce(appendResorts, Object.create(null));
    debug('Loaded %d resorts.', Object.keys(data).length);
    fn(null, data);
  });
}
