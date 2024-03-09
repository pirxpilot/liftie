const debug = require('debug')('liftie:resort:sunshine-village');
const coerce = require('../../tools/coerce');

const lifts = [
  'Angel',
  'Wolverine',
  'Goat\'s Eye',
  'Jackrabbit',
  'Teepee Town',
  'Divide',
  'Standish',
  'Strawberry',
  'Gondola',
  'Wawa',
  'Mitey Mite',
  'Kids Kampus'
];

function parse({ liftstatus }) {
  const ls = Object.entries(liftstatus).reduce((ls, [index, status]) => {
    const i = Number.parseInt(index, 10) - 1;
    if (i >= 0 && i < lifts.length) {
      const name = lifts[i];
      ls[name] = coerce(status);
    }
    return ls;
  }, {});

  debug('Sunshine Village Lift Status:', ls);
  return ls;
}

module.exports = parse;
