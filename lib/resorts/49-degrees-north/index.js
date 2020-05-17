module.exports = {
  selector: 'h4',
  parse: {
    name: {
      child: 0,
      fn: n => n.startsWith('Chair') && n.slice(0, -3)
    },
    status: 1
  }
};
