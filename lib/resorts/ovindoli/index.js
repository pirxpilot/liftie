module.exports = {
  selector: 'table:contains("Nome"):contains("Tipo"):contains("Stato") tr',
  parse: {
    name: '0/0',
    status: {
      child: '2/0/0/1',
      regex: /(Aperto|Chiuso)/,
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
