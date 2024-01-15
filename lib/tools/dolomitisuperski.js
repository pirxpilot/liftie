module.exports = {
  selector: '.table tbody tr',
  parse: {
    name: '1',
    status: {
      child: '3',
      attribute: 'class',
      regex: /\b(red|green)\b/,
      fn: (s) => {
        switch (s) {
          case 'green':
            return 'open';
          default:
            return 'closed';
        }
      },
    },
  },
};
