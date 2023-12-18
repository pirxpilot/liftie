module.exports = {
  selector: 'table:contains("IMPIANTO") tbody tr',
  parse: {
    name: '1',
    status: {
      child: '3',
      fn: (s) => {
        switch (s) {
          case 'APERTA':
            return 'open';
          case 'CHIUSA':
            return 'closed';
        }
      },
    },
  },
};
