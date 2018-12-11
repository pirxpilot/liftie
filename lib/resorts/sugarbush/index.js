module.exports = {
  selector: '.snow-report-tab-lifts tbody tr',
  parse: {
    name: '1/0',
    status: {
      child: '2/0',
      attribute: 'class',
      fn: s => s.split('-').pop()
    }
  }
};
