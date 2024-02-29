const debug = require('debug')('liftie:resort:bogusbasin');

const select = require('../../select');
const coerce = require('../../tools/coerce');

module.exports = parse;

function parse(dom) {
  const dataScript = select(dom, 'x-filterable-lift-trail-status')
    .map(script => script.attribs['data-data'].trim());
  const data = JSON.parse(dataScript);

  const liftStatus = data.lifts
    .reduce((ls, lift) => {
      ls[lift['title']] = coerce(lift['openingStatus']);
      return ls;
    }, {});

  debug('Bogus Basin Lift Status:', liftStatus);
  return liftStatus;
}
