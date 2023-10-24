const toTitleCase = require("to-title-case");

module.exports = {
  selector: '[name=remontadores] + .tabla table tbody tr',
  parse: {
    name: {
      child: '0',
      fn: toTitleCase,
    },
    status: {
      child: '2',
      fn: (s) => {
        switch (s.trim()) {
          case 'Closed':
            return 'closed';
          case 'Open':
            return 'open';
        }
      },
    },
  },
};
