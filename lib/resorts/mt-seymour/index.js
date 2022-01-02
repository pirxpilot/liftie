module.exports = {
  selector: 'tr:contains(LIFTS) ~ tr',
  parse: {
    name: '0',
    status: {
      child: '1',
      fn: element => {
        if (element != 'Closed') {
          return 'open';
        }

        return element;
      }
    }
  }
};
