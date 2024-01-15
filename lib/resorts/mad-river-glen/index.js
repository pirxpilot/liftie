const { text } = require('../../tools/domutil');

module.exports = {
  selector: '.snowreport_sponsorarea:nth-child(2) table tbody tr',
  parse: {
    name: 0,
    status(node) {
      const src = text(node, { child: '1/0', attribute: 'src' });
      return src.includes('cross') ? 'closed' : 'open';
    }
  }
};
