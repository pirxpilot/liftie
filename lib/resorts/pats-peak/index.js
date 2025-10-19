import Debug from 'debug';

const debug = Debug('liftie:resort:pats-peak');
export default parse;

function parse(data) {
  const liftStatus = {};

  data.Lifts.forEach(lift => {
    liftStatus[lift.Name.trim()] = lift.Status.Open ? 'open' : 'closed';
  });

  debug('Pats Peak Lift Status:', liftStatus);
  return liftStatus;
}
