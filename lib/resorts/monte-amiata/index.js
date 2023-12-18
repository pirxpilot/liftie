module.exports = {
  selector: '.wpb_wrapper:contains("Stato apertura impianti") tr',
  parse: {
    name: '0',
    status: {
      child: '1/0',
      attribute: 'src',
      regex: /(rosso|verde)\.png$/,
      fn: (s) => {
        switch (s) {
          case 'verde':
            return 'open';
          case 'rosso':
            return 'closed';
        }
      },
    },
  },
};
