const toTitleCase = require('to-title-case');

module.exports = {
  selector: '[class*="impianto-status"]',
  parse: {
    name: {
      child: '../0/1',
      fn: toTitleCase
    },
    status: {
      child: '.',
      attribute: 'class',
      regex: /impianto-status-([FPO])/,
      fn: (s) => {
        switch (s) {
          case 'F':
            return 'closed';
          case 'P':
            return 'hold';
          case 'O':
            return 'open';
        }
      },
    },
  },
};
