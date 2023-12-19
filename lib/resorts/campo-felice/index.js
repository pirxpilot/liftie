module.exports = {
  selector: 'table:contains("IMPIANTO") tbody tr',
  parse: {
    name: 1,
    status: 3
  }
};
