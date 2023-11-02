module.exports = {
  selector:
    '.lift-status-pop-in:contains(Lifts) + .lifts-and-trails-subsection .lift-status-datum',
  parse: {
    name: '1',
    status: {
      child: '2/0/1',
      attribute: 'fill',
      fn: (s) => {
        switch (s) {
          case '#1ABC9C':
            return 'open';
          case '#ED2559':
            return 'closed';
        }
      },
    },
  },
};
