const cssSelect = require('css-select');

// select we were using before had reverse order of the parameters
function select(dom, selector) {
  return cssSelect.selectAll(selector, dom);
}

module.exports = select;
