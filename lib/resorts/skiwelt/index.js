module.exports = {
  selector: "div.wrapper > div.row",
  parse: {
    name: '2/0',
    status: {
      child: '.',
      attribute: 'data-state',
      fn: s => s === '1' ? 'open' : 'closed'
    }
  }
};
