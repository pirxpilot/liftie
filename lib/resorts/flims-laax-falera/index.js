module.exports = {
  selector: '.lifts > .widget',
  parse: {
    name: '2',
    status: {
      child: '0',
      attribute: 'class',
      regex: /indicator (open|closed|in-preparation)$/,
    }
  }
};
