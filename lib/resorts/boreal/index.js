var debug = require('debug')('liftie:resort:boreal');

module.exports = parse;

var states = [
  'closed',
  'open'
];

function parse(data) {
  var liftStatus = {};

  data.level_3.field_dynamic_content.items.forEach(function(lift) {
    var state = parseInt(lift.field_lift_open, 10);
    var name = lift.title.replace(/\s+cha..lift\s*$/i, '');
    liftStatus[name] = states[state];
  });

  debug('Boreal Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = parse;
