module.exports = {
  selector: '.display-lifts tbody tr:not(:first-child)',
  // selector: 'tr',
  parse: {
    name: '0/0',
    status: {
      child: '1/0',
      attribute: 'class',
      fn: s => s.split(' ').pop()
    }
  }
};
