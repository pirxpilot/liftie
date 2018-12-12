module.exports = {
  selector: 'h2:contains(Lifts) + .trails--inner strong',
  parse: {
    name: {
      child: '.',
      fn: s => s.slice(0, -1)
    },
    status: '+'
  }
};
