module.exports = {
  selector: 'table.slope tbody tr:nth-last-child(-n + 5)',
  parse: {
    name: 1,
    status: {
      child: '2/0',
      attribute: 'alt'
    }
  }
};
