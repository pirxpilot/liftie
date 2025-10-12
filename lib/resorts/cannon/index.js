export default {
  selector: 'table.mb-16 tr',
  parse: {
    name: '1/0',
    status: {
      child: '0/0',
      attribute: 'aria-label',
      regex: /(red|green)/i
    }
  }
};
