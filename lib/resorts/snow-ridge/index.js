export default {
  // hand-posted report: trail rows and lift rows share one table, lift rows
  // follow a marker row with <h2>Lift Report</h2>; off season there is no table
  selector: 'tr:has(h2:contains(Lift Report)) ~ tr',
  parse: {
    name: '0',
    status: '1/0'
  }
};
