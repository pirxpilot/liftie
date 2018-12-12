const { findText } = require('../../tools/domutil');

module.exports = {
  selector: '.lifts-trails .node-view-row:not(.lift-trail-header)',
  parse: {
    name: node => findText(node, 0),
    status: {
      child: '1/0',
      attribute: 'class',
      regex: /-([a-z]+)$/,
      fn: s => s === 'tick' ? 'open' : s
    }
  }
};
