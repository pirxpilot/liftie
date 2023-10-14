const domutil = require('../../tools/domutil');

module.exports = {
  selector: '.liftStatus tr',
  parse: {
    name(node) {
      const child = domutil.child(node, 0);
      return domutil.allText(child).split('-')[0];
    },
    status: 1
  }
};
