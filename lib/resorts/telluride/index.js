module.exports = {
  selector: '.tsr-report-app-lift-status tbody tr',
  parse: {
    name: 1,
    status: {
      child: '0/0',
      attribute: 'class',
      regex: /icon-(.+)$/
    }
  }
};
