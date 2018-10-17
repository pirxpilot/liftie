module.exports = {
  selector: '#facility-lifts > .table-responsive > .table-fixed > tbody > tr',
  parse: {
    name: 2,
    status: {
      child: '0/0',
      attribute: 'aria-label'
    }
  }
};
