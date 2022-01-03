module.exports = {
  selector: 'tr:contains(LIFTS) ~ tr',
  parse: {
    name: '0',
    status: {
      child: '1',
      fn: status => status === 'Closed' ? 'closed' : 'open'
    }
  }
};
