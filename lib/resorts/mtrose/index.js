const { text } = require('../../tools/domutil');

module.exports = {
  selector: '.mount_note + .full_top_border > .liftStat > .lift_title',
  parse: {
    name: '0',
    status: node => text(node.next, 0)
  }
};
