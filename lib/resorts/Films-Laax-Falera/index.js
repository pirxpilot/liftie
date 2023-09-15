module.exports = {
  selector: "div.col-xl-9 > div.lifts > div.widget",
  parse: {
    name: '2',
    status: {
      child: '0',
      attribute: 'class',
      regex: /(indicator open|indicator closed|indicator in-preparation)$/,
      fn: s => {
        if (s === 'indicator closed' || s === 'indicator in-preparation') {
          return 'closed';
        } else if (s === 'indicator open') {
          return 'open';
        }
        return s;
      }
    }    
  }
};
