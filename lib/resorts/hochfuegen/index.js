const domutil = require('../../tools/domutil');

module.exports = {
  selector: 'h3:contains(Lifte) ~ table .liftrows',
  parse(node) {
    return {
      name: domutil.childText(node, '2/0'),
      status: domutil.child(node, '0/0/0').attribs.alt
    };
  }
};
