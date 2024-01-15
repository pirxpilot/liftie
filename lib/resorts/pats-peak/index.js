const debug = require('debug')('liftie:resort:pats-peak');
module.exports = parse;

function parse(data) {
  const liftStatus = {};

  data.Lifts.forEach((lift) => {
    liftStatus[lift.Name.trim()] = lift.Status.Open ? 'open' : 'closed';
  });

  debug('Pats Peak Lift Status:', liftStatus);
  return liftStatus;
}
