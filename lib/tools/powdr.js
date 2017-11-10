var _ = require('lodash');
var debug = require('debug')('liftie:resort:powdr');

module.exports = makeParser;

var states = [
  'closed',
  'open'
];

function makeParser(path = 'level_3.field_dynamic_content.items') {
  return function parse(data) {
    var liftStatus = {};

    _.get(data, path, []).forEach(function(lift) {
      var state = parseInt(lift.field_lift_open, 10);
      var name = lift.title.replace(/\s+cha..lift\s*$/i, '');
      liftStatus[name] = states[state];
    });

    debug('Lift Status:', liftStatus);
    return liftStatus;
  };
}
