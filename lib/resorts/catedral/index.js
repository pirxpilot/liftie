module.exports = {
  selector: 'div.accordion-body p:contains(MEDIOS) + table tr', // selector for lift information
  parse: {
    name: {
      child: '1'
    },
    status: {
      child: '2/0',
      attribute: 'alt'
    }
  }
};
