module.exports = {
  selector: 'h3:contains(Lift Status) + div img.lf-type',
  parse: {
    name: '+',
    status: {
      child: '+/+/0',
      attribute: 'alt',
      fn: text => /open/i.test(text) ? 'open' : 'closed'
    }
  }
};
