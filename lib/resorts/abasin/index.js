module.exports = {
  selector: '.snow-report-terrain .ab-status-large',
  parse: {
    name: 1,
    status: {
      child: 0,
      attribute: 'class',
      fn: v => v.split('_').pop()
    }
  }
};
