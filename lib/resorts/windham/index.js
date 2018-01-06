module.exports = {
  selector: '#tab-2 .lifts-table .trail',
  parse: {
    name: 0,
    status: {
      child: 5,
      attribute: 'alt',
      fn: text => /open/i.test(text) ? 'open' : 'closed'
    }
  }
};
