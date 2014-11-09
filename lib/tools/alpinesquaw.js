var vm = require('vm');
var coerce = require('./coerce');
var debug = require('debug')('liftie:resort:alpinesqaw');

module.exports = parse;

function parse(dom) {
  var sandbox = {
    routesList: {}
  }, features, liftStatus;

  vm.runInNewContext(dom[0].data, sandbox);

  features = sandbox.routesList.features;

  if (!Array.isArray(features)) {
    return;
  }

  liftStatus = features
    .filter(function(f) {
      return f.properties.name && f.properties.rating === 'Lift';
    })
    .reduce(function(ls, f) {
      ls[f.properties.name] = coerce(f.properties.status || 'closed');
      return ls;
    }, {});

  debug('alpinesqaw Lift Status:', liftStatus);
  return liftStatus;
}

