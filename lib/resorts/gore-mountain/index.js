var domutil = require('../../tools/domutil');

module.exports = {
  selector: '.lift-conditions-mountain-section-container .lift-label',
  parse: {
    name: node => domutil.findText(node),
    status: node => node.next.children[0].attribs.class.split(' ').pop()
  }
};

