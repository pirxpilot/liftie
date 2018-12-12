module.exports = {
  selector: '.row.chair-bar',
  parse: {
    name: {
      child: 0,
      fn: s => s.trim().slice(0, -1),
    },
    status: 1
  }
};
