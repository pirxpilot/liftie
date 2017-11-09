var domutil = require('../../tools/domutil');

module.exports = {
  selector: '.tablepress-table-name',
  parse: function(node) {
    var ns = domutil.findText(node).split(' &#8211; ');
    return {
      name: ns[0],
      status: ns[1]
    };
  }
};
