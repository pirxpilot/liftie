module.exports = {
  selector: '#tablepress-10 tr',
  parse: {
    name: 0,
    status: {
      child: 1,
      fn: s => s === 'CLOSED' ? 'closed' : 'open'
    }
  }
};
