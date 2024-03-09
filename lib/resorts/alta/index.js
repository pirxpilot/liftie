const vm = require('node:vm');
const debug = require('debug')('liftie:resort:alta');

const select = require('../../select');
const { allText } = require('../../tools/domutil');

module.exports = parse;

function extractLiftData(script) {
  const data = vm.runInNewContext(script, { window: Object.create(null) });
  return data?.liftStatus?.lifts ?? {};
}

function parse(dom) {
  const dataScript = select(dom, 'script')
    .map(script => allText(script).trim())
    .find(script => script.includes('window.Alta = '));

  const liftStatus = extractLiftData(dataScript)
    .reduce((ls, { name, open }) => {
      ls[name] = open ? 'open' : 'closed';
      return ls;
    }, {});

  debug('Alta Lift Status:', liftStatus);
  return liftStatus;
}
