var domutil = require('../../tools/domutil');

module.exports = {
  selector: '#lifts tbody tr',
  parse: function(node) {
    return {
      name: domutil.childText(node, 2),
      status: domutil.child(node, '0/0').attribs.class.split('-').pop()
    };
  }
};
