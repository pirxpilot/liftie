module.exports = {
  selector: '[data-tag="lifts"] tr:not(:first-child)',
  parse: {
    name: '3/0',
    status: {
      child: '0',
      attribute: 'class',
      regex: /state(\d)$/,
      fn: s => {
        switch (s) {
          case '0':
            return 'closed';
          case '1':
            return 'open';
        }
      }
    }
  }
};
