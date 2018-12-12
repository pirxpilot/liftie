module.exports = {
  selector: '.row:nth-child(n + 7) td:nth-child(2n + 1)',
  parse: {
    name: {
      child: 0,
      fn: name => name.startsWith('Lift') && name.slice(5)
    },
    status: '+/0'
  }
};
