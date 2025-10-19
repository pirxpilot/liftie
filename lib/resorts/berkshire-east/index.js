export default {
  selector: '#collapse1 .col-03',
  parse: {
    name: '1',
    status: {
      child: '0',
      attribute: 'class',
      regex: /fa-(check|remove)/,
      fn: s => {
        switch (s) {
          case 'check':
            return 'open';
          case 'remove':
            return 'closed';
          default:
            return 'unknown';
        }
      }
    }
  }
};
