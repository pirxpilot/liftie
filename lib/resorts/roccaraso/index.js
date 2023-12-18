module.exports = {
  selector: '.container .content',
  parse: {
    name: '1',
    status: {
      child: '0',
      attribute: 'class',
      regex: /ic_stato([0-9])/,
      fn: (s) => {
        switch (s) {
          case '1':
            return 'open';
          case '0':
            return 'closed';
        }
      },
    },
  },
};
