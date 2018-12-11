const states = {
  'check': 'open',
  'clock': 'scheduled',
  'times': 'closed'
};

module.exports = {
  selector: 'h2:contains(LIFT STATUS) + table tr:not(:first-child)',
  parse: {
    name: 0,
    status: {
      child: '2/0',
      attribute: 'class',
      regex: /fa-([a-z]+)-circle/,
      fn: s => states[s]
    }
  }
};
