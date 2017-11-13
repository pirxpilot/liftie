module.exports = {
  selector: 'h4:contains(Lift Status) + table tr:not(.heading_cell)',
  parse: {
    name: 0,
    status: 2
  }
};
