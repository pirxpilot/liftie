module.exports = {
  selector: '#conditions_lifts_1339bb0d2df6247a6d9778c66b41883b div.breakInsideAvoid',
  parse: {
    name: {
      child: '1'
    },
    status: {
      child: '0/0',
      attribute: 'alt',
      fn: status => {
        switch (status) {
          case 'Open': return 'open';
          default: return 'closed';
        }
      }
      
    }
  }
};
