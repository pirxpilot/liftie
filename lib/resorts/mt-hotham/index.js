const coerce = require('../../tools/coerce');
const debug = require('debug')('liftie:resort:mt-hotham');

module.exports = parse;

// see: wmPopulateLiftStatus in https://www.mthotham.com.au/Portals/_default/skins/hotham/dist/js/wm-ajax2.js -
const KEY_TO_NAME = {
  'TheVillage': 'Audi Quattro',
  'BigDExpress': 'Big D',
  'BlueRibbon': 'Blue Ribbon',
  'TheDrift': 'The Drift',
  'Gotcha': 'Gotcha',
  'HeavenlyValley': 'Heavenly Valley',
  'Keoghs': 'Keogh\'s',
  'TheOrchard': 'Orchard',
  'PlaygroundMidStation': 'Playground',
  'RoadRunner': 'Road Runner',
  'TheSummit': 'Summit',
  'SummitTrainer': 'Summit Trainer',
  'DinnerPlain': 'Dinner Plain',
};

function parse(data) {
  const liftStatus = {};

  Object.entries(KEY_TO_NAME).forEach(([key, name]) => {
    const status = data[`${key}DisplayStatus`];
    if (status) {
      liftStatus[name] = coerce(status);
    }
  });

  debug('Lift Status:', liftStatus);
  return liftStatus;
}
