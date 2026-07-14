export default {
  // day column cell carries lift-open/lift-closed class; in season the cell
  // text is the opening time, so the class is the only reliable status signal
  selector: '#gp-lift-table tr:has(td.lift-col-name)',
  parse: {
    name: '0',
    status: {
      child: 1,
      attribute: 'class',
      regex: /lift-(open|closed)/
    }
  }
};
