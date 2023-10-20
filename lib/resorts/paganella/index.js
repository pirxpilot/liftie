module.exports = {
  selector: '.pg-table tr:not(:first-child)',
  parse: {
    name: '3',
    status: {
      child: '4/0',
      attribute: 'alt',
      fn: (s) => {
        switch (s) {
          case 'Aperto':
            return 'open';
          case 'Chiuso':
            return 'closed';
        }
      },
    },
  },
};
