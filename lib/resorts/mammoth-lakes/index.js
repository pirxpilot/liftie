const debug = require('debug')('mammoth-lakes');
const { html } = require('../../lifts/parser');
const { collect } = require('../../tools/domutil');

module.exports = parse;

const config = {
  selector: '.lift-description',
  parse: {
    name: '0/0',
    status: node => node.prev.attribs.class.split(/[-\s]/).pop()
  }
};

function collectParse(dom) {
  const liftStatus = collect(dom, config.selector, config.parse);
  debug(`Mammoth Lift Status:`, liftStatus);
  return liftStatus;
}

function parse({ data }, fn) {
  html(data, collectParse, fn);
}
