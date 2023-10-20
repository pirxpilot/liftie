module.exports = {
  selector: '.pg-table tr:not(:first-child)',
  parse: {
    name: 2,
    status: {
      child: '3/0',
      attribute: 'alt'
    },
  },
};
